// import * as browserStorage from 'src/utils/browserStorage'

import {
	inPlaceArrayDiff,
	inPlaceArrayConcat,
	delay,
	asyncSafeWhile,
	generateUniqueId,
} from './utils'

import {
	log,
	logOpenCollapsed,
	logClose,
	enableLogs,
	disableLogs,
	setCustomLogHandler,
} from './log'

import {
	guaranteeLockThread,
	unlockThread,
} from './mutex'

import {
	getRequestAccessStatus,
	resetAccess,
	requestAccess as requestAccessInternal,
} from './access'

import {
	findDeadLinks,
	findPossibleLinks,
	refreshLinksInfoIfNeeded,
	syncLinksWithState,
	saveLinksStateToLocalStorage,
} from './links'

import {
	uploadHexToSingleLink,
	guaranteeSingleLinkEnterBootloaderMode,
	guaranteeSingleLinkExitBootloaderMode,
} from './singleLink'

/**
* Globals
*/
const mainLinksMap = new Map()
const mainLinks = []
const pendingUploads = []
const pendingEnterBootloaderMode = []
const pendingExitBootloaderMode = []
let monitoring = false
let requestingAccess = false

export {
	enableLogs,
	disableLogs,
	setCustomLogHandler,
	getRequestAccessStatus,
	resetAccess,
}

export async function requestAccess(bootloaderHex, programHex) {
	requestingAccess = true
	await requestAccessInternal(bootloaderHex, programHex)
	requestingAccess = false
}

export async function init() {
	if (monitoring) {
		log('Already init')
		return
	}
	try {
		monitoring = true
		continuouslyMonitor(
			true,
			mainLinksMap,
			mainLinks,
			pendingUploads,
			pendingEnterBootloaderMode,
			pendingExitBootloaderMode,
		)
		if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
			window.addEventListener('storage', handleStateChange)
		}
	} catch (error) {
		monitoring = false
		if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
			window.removeEventListener('storage', handleStateChange)
		}
		log('Could not init', error)
	}
}

export function destroy() {
	monitoring = false
	if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
		window.removeEventListener('storage', handleStateChange)
	}
}

export async function getModel() {
	return { quirkbots : mainLinks }
}

export function getLinks() {
	return mainLinks
}

export function getLinksMap() {
	return mainLinksMap
}

export function getLinkByUuid(uuid) {
	return mainLinks.filter(l => l.uuid === uuid).pop()
}

export function getLinkByRuntimeId(runtimeId) {
	return mainLinks.filter(l => l.runtimeId === runtimeId).pop()
}

export async function uploadHexToLink(link, hexString) {
	const requests = pendingUploads
	if (requests.filter(upload => upload.link === link).length) {
		throw new Error('There is an ongoing upload to this link.')
	}

	if (!link.midi) {
		throw new Error('This link is not midi enabled.')
	}

	const request = {
		link,
		hexString,
	}
	requests.push(request)

	await asyncSafeWhile(
		async () => requests.includes(request),
		async () => delay(100),
		() => {
			request.error = new Error('Pending uploads took too long to clear, exiting')
			request.link.uploading = false
			if (requests.includes(request)) {
				requests.splice(requests.indexOf(request), 1)
			}
		},
		600
	)

	if (request.error) {
		throw request.error
	}
	return request.link
}

export async function uploadHexToLinkByUuid(uuid, hexString) {
	return uploadHexToLink(getLinkByUuid(uuid), hexString)
}

export async function enterBootloaderMode(link) {
	const requests = pendingEnterBootloaderMode
	if (requests.filter(request => request.link === link).length) {
		throw new Error('There is an ongoing request to enter bootloader mode on this link.')
	}

	const request = {
		link,
	}
	requests.push(request)
	await asyncSafeWhile(
		async () => requests.includes(request),
		async () => delay(100),
		() => {
			request.error = new Error('Pending enter bootloader took too long to clear, exiting')
			request.link.enteringBootloaderMode = false
			if (requests.includes(request)) {
				requests.splice(requests.indexOf(request), 1)
			}
		},
		600
	)

	if (request.error) {
		throw request.error
	}
	return request.link
}

export async function enterBootloaderModeByUuid(uuid) {
	return enterBootloaderMode(getLinkByUuid(uuid))
}

export async function exitBootloaderMode(link) {
	const requests = pendingExitBootloaderMode
	if (requests.filter(request => request.link === link).length) {
		throw new Error('There is an ongoing request to exit bootloader mode on this link.')
	}

	const request = {
		link,
	}
	requests.push(request)
	await asyncSafeWhile(
		async () => requests.includes(request),
		async () => delay(100),
		() => {
			request.error = new Error('Pending exit bootloader took too long to clear, exiting')
			request.link.exitingBootloaderMode = false
			if (requests.includes(request)) {
				requests.splice(requests.indexOf(request), 1)
			}
		},
		600
	)

	if (request.error) {
		throw request.error
	}
	return request.link
}

export async function exitBootloaderModeByUuid(uuid) {
	return exitBootloaderMode(getLinkByUuid(uuid))
}

async function continuouslyMonitor(firstRun, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes) {
	if (!monitoring) {
		log('Monitor - Monitoring disabled. Call init() to start')
		return
	}

	if (requestingAccess) {
		log('Monitor - Currently requesting access. Rescheduling.')
		await delay(200 + (Math.random() * 100))
		continuouslyMonitor(false, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes)
		return
	}

	if (typeof document !== 'undefined' && document.hidden) {
		log('Monitor - Tab is not visible. Rescheduling.')
		await delay(200 + (Math.random() * 100))
		continuouslyMonitor(false, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes)
		return
	}

	const runtimeId = generateUniqueId()
	logOpenCollapsed(`Monitor - Runtime ID: ${runtimeId}`)

	logOpenCollapsed('Lock Thread')
	try {
		await guaranteeLockThread(runtimeId)
		log('Thread locked', runtimeId)
	} catch (error) {
		log(`Error trying to lock thread ${runtimeId}`, error)
		logClose(true)
		await delay(200 + (Math.random() * 100))
		continuouslyMonitor(false, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes)
		return
	}
	logClose()

	if (firstRun) {
		logOpenCollapsed('Sync with initial state')
		try {
			await syncWithRawState(localStorage.getItem('_qbwebserial_links_'), linksMap, links)
		} catch (error) {
			log(error)
		}
		logClose()
	}

	logOpenCollapsed('Find dead links')
	let removedLinks
	try {
		removedLinks = await findDeadLinks(links)
	} catch (error) {
		log(error)
		removedLinks = []
	}
	inPlaceArrayDiff(links, removedLinks)
	removedLinks.forEach(link => linksMap.delete(link))
	log('Removed links', removedLinks)
	await saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Find new links')
	let foundLinks
	try {
		foundLinks = await findPossibleLinks(links)
	} catch (error) {
		log(error)
		foundLinks = []
	}
	inPlaceArrayConcat(links, foundLinks)
	foundLinks.forEach(link => linksMap.set(link, link))
	log('Found links', foundLinks)
	await saveLinksStateToLocalStorage(links)
	logClose()

	log('Current links', links)

	// logOpenCollapsed('Update access permissions')
	// await Promise.all(links.map(async (link) => {
	// 	if (link.bootloader) {
	// 		await setRequestAccessStatus({ bootloader : true })
	// 	} else {
	// 		await setRequestAccessStatus({ program : true })
	// 	}
	// }))
	// logClose()

	logOpenCollapsed('Update links info (if needed)')
	try {
		await refreshLinksInfoIfNeeded(links)
	} catch (error) {
		log(error)
	}
	await saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Handle pending enter bootloader mode')
	try {
		await handlePendingEnterBootloaderModes(links, enterBootloaderModes)
	} catch (error) {
		log(error)
	}
	await saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Handle pending exit bootloader mode')
	try {
		await handlePendingExitBootloaderModes(links, exitBootloaderModes)
	} catch (error) {
		log(error)
	}
	await saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Handle pending uploads')
	try {
		await handlePendingUploads(links, uploads)
	} catch (error) {
		log(error)
	}
	await saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Unlock Thread')
	try {
		await unlockThread(runtimeId)
		log('Thread unlocked', runtimeId)
	} catch (error) {
		logClose(true)
		log('Error trying to unlock thread', error)
		await delay(200 + (Math.random() * 100))
		continuouslyMonitor(false, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes)
		return
	}
	logClose()

	logClose(true)
	await delay(1000)

	if (removedLinks.length) {
		log('%cQuirkbots removed', 'color:orange', removedLinks)
	}
	if (foundLinks.length) {
		log('%cQuirkbots found', 'color:green', foundLinks)
	}
	continuouslyMonitor(false, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes)
}

async function handlePendingUploads(links, uploads) {
	// Handle only one upload at the time
	const upload = uploads[0]
	if (upload) {
		await handleSinglePendingUpload(links, upload, uploads)
	}
}

async function handleSinglePendingUpload(links, request, requests) {
	logOpenCollapsed('Upload')
	request.link.uploading = true
	await saveLinksStateToLocalStorage(links)
	try {
		await uploadHexToSingleLink({
			link      : request.link,
			hexString : request.hexString,
			onUpdate  : () => saveLinksStateToLocalStorage(links),
		})
		log('%cUpload success', 'color:green')
	} catch (error) {
		log('%cUpload error', 'color:red', error)
		request.error = error
	}
	request.link.uploading = false
	if (requests.includes(request)) {
		requests.splice(requests.indexOf(request), 1)
	}

	await saveLinksStateToLocalStorage(links)
	logClose()
}

async function handlePendingEnterBootloaderModes(links, requests) {
	// Handle only one request at the time
	const request = requests[0]
	if (request) {
		await handleSinglePendingEnterBootloaderMode(links, request, requests)
	}
}

async function handleSinglePendingEnterBootloaderMode(links, request, requests) {
	logOpenCollapsed('Enter bootloader mode')
	request.link.enteringBootloaderMode = true
	await saveLinksStateToLocalStorage(links)
	try {
		await guaranteeSingleLinkEnterBootloaderMode(request.link)
		log('%cEnter bootloader success!', 'color:green')
	} catch (error) {
		log('%cEnter bootloader error', 'color:red', error)
		request.error = error
	}
	request.link.enteringBootloaderMode = false
	if (requests.includes(request)) {
		requests.splice(requests.indexOf(request), 1)
	}
	await saveLinksStateToLocalStorage(links)
	logClose()
}

async function handlePendingExitBootloaderModes(links, requests) {
	// Handle only one request at the time
	const request = requests[0]
	if (request) {
		await handleSinglePendingExitBootloaderMode(links, request, requests)
	}
}

async function handleSinglePendingExitBootloaderMode(links, request, requests) {
	logOpenCollapsed('Exit bootloader mode')
	request.link.exitingBootloaderMode = true
	await saveLinksStateToLocalStorage(links)
	try {
		await guaranteeSingleLinkExitBootloaderMode(request.link)
		log('%Exit bootloader success!', 'color:green')
	} catch (error) {
		log('%Exit bootloader error', 'color:red', error)
		request.error = error
	}
	request.link.exitingBootloaderMode = false
	if (requests.includes(request)) {
		requests.splice(requests.indexOf(request), 1)
	}
	await saveLinksStateToLocalStorage(links)
	logClose()
}

// Syncronize with other tabs
function handleStateChange({ key, newValue }) {
	if (key !== '_qbwebserial_links_') {
		return
	}
	syncWithRawState(newValue, mainLinksMap, mainLinks)
}

async function syncWithRawState(rawState, linksMap, links) {
	logOpenCollapsed('Sync with state')
	let state
	try {
		state = JSON.parse(rawState)
	} catch (error) {
		log('Error trying parse raw state', error)
		logClose()
		return
	}
	if (!state) {
		log('State is empty')
		logClose()
		return
	}
	log('State', state)
	const {
		updatedLinks,
		foundLinks,
		removedLinks,
	} = await syncLinksWithState(links, state)

	// update the maps
	foundLinks.forEach(link => linksMap.set(link, link))
	removedLinks.forEach(link => linksMap.delete(link))

	if (updatedLinks.length) {
		log('%cQuirkbots updated', 'color:blue', updatedLinks)
	}
	if (removedLinks.length) {
		log('%cQuirkbots removed', 'color:orange', removedLinks)
	}
	if (foundLinks.length) {
		log('%cQuirkbots found', 'color:green', foundLinks)
	}
	logClose()
}
