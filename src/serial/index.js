import * as browserStorage from 'src/utils/browserStorage'

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
	setCustomLogHandler
} from './log'

import {
	guaranteeLockThread,
	unlockThread,
} from './mutex'

import {
	getUsbFilters,
} from './serial'

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
	guaranteeSingleLinkExitBootloaderMode
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

async function writeDataToFirstAvaiblePort(bytes) {
	const [port] = await navigator.serial.getPorts()
	// If there's no port, we have a bigger issue and can't do antyhing...
	if (!port) {
		throw new Error('No port avaiable.')
	}
	// Open the port
	await port.open({ baudRate : 9600 })
	// Send the "enter bootloader" message
	const writer = port.writable.getWriter()
	const data = new Uint8Array(bytes)
	await writer.write(data)
	writer.releaseLock()
	await port.close()
}

async function detectInPorts({ bootloader, program }) {
	const filters = getUsbFilters({ bootloader, program })
	let detected = false
	const ports = await navigator.serial.getPorts()
	ports.forEach((port) => {
		if (detected) {
			return
		}
		const { usbProductId, usbVendorId } = port.getInfo()
		filters.forEach((d) => {
			if (detected) {
				return
			}
			if (d.usbProductId === usbProductId && d.usbVendorId === usbVendorId) {
				detected = true
			}
		})
	})
	return detected
}

async function refreshPorts({ bootloader, program }) {
	let filters = []
	if (bootloader) {
		filters = filters.concat(getUsbFilters({ bootloader : true }))
	}
	if (program) {
		filters = filters.concat(getUsbFilters({ program : true }))
	}

	try {
		await navigator.serial.requestPort({ filters })
	}	catch (e) {
		console.log('Web Serial request ports error:', e)
	}
}

export async function setRequestAccessStatus({ bootloader, program }) {
	if (typeof bootloader !== 'undefined') {
		browserStorage.set('web-serial', 'bootloader-detected', bootloader)
	}
	if (typeof program !== 'undefined') {
		browserStorage.set('web-serial', 'program-detected', program)
	}
}

export async function getRequestAccessStatus() {
	const bootloader = browserStorage.get('web-serial', 'bootloader-detected') || false
	const program = browserStorage.get('web-serial', 'program-detected') || false
	return [bootloader, program]
}

export async function resetAccess() {
	await setRequestAccessStatus({ bootloader : false, program : false })
}

export async function requestAccess() {
	// Check if permission settings have been saved already
	let [bootloader, program] = await getRequestAccessStatus()
	if (bootloader && program) {
		// Success!
		return
	}
	// If the permissions are not granted, check again, as it may only be the case
	// that the storage has been cleared, but the permissions are actually in place
	if (!bootloader) {
		bootloader = await detectInPorts({ bootloader : true })
		await setRequestAccessStatus({ bootloader })
	}
	if (!program) {
		program = await detectInPorts({ program : true })
		await setRequestAccessStatus({ program })
	}

	if (bootloader && program) {
		// Success!
		return
	}
	// If we don't have anything allowed yet...
	if (!bootloader && !program) {
		// Request access to both
		await refreshPorts({ bootloader : true, program : true })
		bootloader = await detectInPorts({ bootloader : true })
		program = await detectInPorts({ program : true })
		await setRequestAccessStatus({ bootloader, program })
		// If nothing was detected, we are out of luck and this routine can end now.
		if (!bootloader && !program) {
			return
		}
	}
	// At this point, at least one device was allowed.
	if (program) {
		// We can be in these three states:
		// 1. No device is connected (no port avaiable)
		// 2. Device is connected on bootloader mode (no port avaiable - maybe no permissions yet)
		// 3. Device is connected on program mode (port should be avaible)

		// Anyway, we send a message to put the board on bootloader mode.
		// If state is 1 or 2, it will throw an error, but we can just skip it.
		// If state is 3, the board will disconnect and connect again in bootloader
		try {
			await writeDataToFirstAvaiblePort([0xb]) // 0xb == "enter bootloader"
		} catch (e) {
			// State was 1 or 2, ignorig...
		}

		// // There's a chance the bootloader is actually already allowed, but the
		// // permissions have been cleared (eg. localStorage deleted). To avoid an
		// // unecessary prompt on this case, we wait a little bit (so the new device
		// // has enought time to be picked up by the OS), and try to detected it,
		// // before refreshing the posts
		// await new Promise(r => setTimeout(r, 1000))
		// bootloader = await detectInPorts({ bootloader : true })
		// await setRequestAccessStatus({ bootloader })
		// // If the bootloader was detected, great! We are done.
		// if (bootloader) {
		// 	// For convenience, we exit the bootloader mode
		// 	try {
		// 		await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
		// 	} catch (e) {}
		// 	// Success!
		// 	return
		// }

		// Ok, if we got here, maybe the bootloader has not permissions yet. In
		// that case, request access (only for bootloader)
		await refreshPorts({ bootloader : true })
		bootloader = await detectInPorts({ bootloader : true })
		await setRequestAccessStatus({ bootloader })
		// If the bootloader was detected, great! We are done.
		if (bootloader) {
			// For convenience, we exit the bootloader mode
			try {
				await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
			} catch (e) {}
			// Success!
			return
		}
		// If was not detected it means that either we are in state 1, or that we
		// were on state 3, but we failed to put the board in bootloader mode.
		// Anyway, we can't do anything here.
		return
	}

	if (bootloader) {
		// We can be in these three states:
		// 1. No device is connected (no port avaiable)
		// 2. Device is connected on bootloader mode (port should be avaible)
		// 3. Device is connected on program mode (no port avaiable - maybe no permissions yet)

		// Anyway, we send a message to exit bootloader mode.
		// If state is 1 or 3, it will throw an error, but we can just skip it.
		// If state is 2, the board will disconnect and connect again in bootloader
		try {
			await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
		} catch (e) {
			// State was 1 or 3, ignorig...
		}

		// // There's a chance the program mode is actually already allowed, but the
		// // permissions have been cleared (eg. localStorage deleted). To avoid an
		// // unecessary prompt on this case, we wait a little bit (so the new device
		// // has enought time to be picked up by the OS), and try to detected it,
		// // before refreshing the posts
		// await new Promise(r => setTimeout(r, 2000))
		// program = await detectInPorts({ program : true })
		// await setRequestAccessStatus({ program })
		// // If the program was detected, great! We are done.
		// if (program) {
		// 	// Success!
		// 	return
		// }

		// Ok, if we got here, maybe the bootloader has not permissions yet. In
		// that case, request access (only for bootloader)
		await refreshPorts({ program : true })
		program = await detectInPorts({ program : true })
		await setRequestAccessStatus({ program })

		// Nothing else to do here
	}
}

/// ////////////// From MIDI interface

export { enableLogs, disableLogs, setCustomLogHandler }

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
	if (pendingUploads.filter(upload => upload.link === link).length) {
		throw new Error('There is an ongoing upload to this link.')
	}

	if (!link.midi) {
		throw new Error('This link is not midi enabled.')
	}

	const pendingUpload = {
		link,
		hexString
	}
	pendingUploads.push(pendingUpload)

	await asyncSafeWhile(
		async () => pendingUploads.includes(pendingUpload),
		async () => delay(100),
		() => log('Pending uploads took too long to clear, exiting'),
		600
	)

	if (pendingUpload.error) {
		throw pendingUpload.error
	}
	return pendingUpload.link
}

export async function uploadHexToLinkByUuid(uuid, hexString) {
	return uploadHexToLink(getLinkByUuid(uuid), hexString)
}

export async function enterBootloaderMode(link) {
	if (pendingEnterBootloaderMode.filter(request => request.link === link).length) {
		throw new Error('There is an ongoing request to enter bootloader mode on this link.')
	}

	const request = {
		link
	}
	pendingEnterBootloaderMode.push(request)
	await asyncSafeWhile(
		async () => pendingEnterBootloaderMode.includes(request),
		async () => delay(100),
		() => log('Pending enter bootloader took too long to clear, exiting'),
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
	if (pendingExitBootloaderMode.filter(request => request.link === link).length) {
		throw new Error('There is an ongoing request to exit bootloader mode on this link.')
	}

	const request = {
		link
	}
	pendingExitBootloaderMode.push(request)
	await asyncSafeWhile(
		async () => pendingExitBootloaderMode.includes(request),
		async () => delay(100),
		() => log('Pending exit bootloader took too long to clear, exiting'),
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
		log('Monitoring disabled. Call init() to start')
		return
	}
	const runtimeId = generateUniqueId()
	logOpenCollapsed(`Monitor - Runtime ID: ${runtimeId}`)

	if (typeof document !== 'undefined' && document.hidden) {
		log('Tab is not visible. Stopping task.')
		logClose(true)
		await delay(200 + (Math.random() * 100))
		continuouslyMonitor(false, linksMap, links, uploads, enterBootloaderModes, exitBootloaderModes)
		return
	}

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
	saveLinksStateToLocalStorage(links)
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
	saveLinksStateToLocalStorage(links)
	logClose()

	log('Current links', links)

	logOpenCollapsed('Update access permissions')
	await Promise.all(links.map(async (link) => {
		if (link.bootloader) {
			await setRequestAccessStatus({ bootloader : true })
		} else {
			await setRequestAccessStatus({ program : true })
		}
	}))
	logClose()

	logOpenCollapsed('Update links info (if needed)')
	try {
		await refreshLinksInfoIfNeeded(links)
	} catch (error) {
		log(error)
	}
	saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Handle pending enter bootloader mode')
	try {
		await handlePendingEnterBootloaderModes(links, enterBootloaderModes)
	} catch (error) {
		log(error)
	}
	saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Handle pending exit bootloader mode')
	try {
		await handlePendingExitBootloaderModes(links, exitBootloaderModes)
	} catch (error) {
		log(error)
	}
	saveLinksStateToLocalStorage(links)
	logClose()

	logOpenCollapsed('Handle pending uploads')
	try {
		await handlePendingUploads(links, uploads)
	} catch (error) {
		log(error)
	}
	saveLinksStateToLocalStorage(links)
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

async function handleSinglePendingUpload(links, upload, uploads) {
	logOpenCollapsed('Upload')
	upload.link.uploading = true
	saveLinksStateToLocalStorage(links)
	try {
		await uploadHexToSingleLink(
			upload.link,
			upload.hexString,
			() => saveLinksStateToLocalStorage(links)
		)
		log('%cSuccess', 'color:green')
	} catch (error) {
		log('%cUpload error', 'color:red', error)
		upload.error = error
	}
	upload.link.uploading = false
	uploads.splice(uploads.indexOf(upload), 1)
	saveLinksStateToLocalStorage(links)
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
	logOpenCollapsed('Enter Bootloader Mode')
	request.link.enteringBootloaderMode = true
	saveLinksStateToLocalStorage(links)
	try {
		await guaranteeSingleLinkEnterBootloaderMode(request.link)
		log('%cSuccess', 'color:green')
	} catch (error) {
		log('%cEnter Bootloader error', 'color:red', error)
		request.error = error
	}
	request.link.enteringBootloaderMode = false
	requests.splice(requests.indexOf(request), 1)
	saveLinksStateToLocalStorage(links)
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
	logOpenCollapsed('Exit Bootloader Mode')
	request.link.exitingBootloaderMode = true
	saveLinksStateToLocalStorage(links)
	try {
		await guaranteeSingleLinkExitBootloaderMode(request.link)
		log('%cSuccess', 'color:green')
	} catch (error) {
		log('%Exit Bootloader error', 'color:red', error)
		request.error = error
	}
	request.link.exitingBootloaderMode = false
	requests.splice(requests.indexOf(request), 1)
	saveLinksStateToLocalStorage(links)
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
