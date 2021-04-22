import {
	testSingleLinkConnectionByMessageEcho,
	refreshSingleLinkUuid,
	refreshSingleLinkBootloaderStatus,
	refreshSingleLinkMidiEnabledStatus,
	refreshSingleLinkInfo,
	refreshSingleLinkInfoIfNeeded,
	createNewLink,
	mergeLinkWithStateLink,
} from './singleLink'

import {
	log,
	logOpen,
	logClose,
	logOpenCollapsed,
} from './log'

import {
	filterValidConnections,
	// getMIDIInputs,
	// getMIDIOutputs,
	getMIDIInputById,
	getMIDIOutputById,
} from './midi'

import {
	getPorts,
	openPort,
	closePort,
	getPortByFilter,
} from './serial'

import {
	arrayDiff,
	asyncSafeWhile,
	delay,
	inPlaceArrayConcat,
	inPlaceArrayDiff,
} from './utils'

export async function findDeadLinks(links) {
	const ports = await getPorts()
	log('Current ports', ports)
	return links.filter(link => !ports.filter(port => {
		const linkPortInfo = link.port.getInfo()
		const portInfo = port.getInfo()
		return linkPortInfo.usbVendorId === portInfo.usbVendorId
			&& linkPortInfo.usbProductId === portInfo.usbProductId
	}).length)
}

export async function findPossibleLinks(links) {
	// Find the links by checking the avaible ports
	logOpenCollapsed('Finding links by "avaiable ports"')
	const newLinks = await findPossibleLinksByAvaiblePorts(
		links
	)
	log('Found links', newLinks)
	logClose()

	// Update the info on the links
	await refreshLinksInfo(newLinks)

	return newLinks
}

export async function findPossibleLinksByAvaiblePorts(links) {
	// Get all avaible ports
	const rawPorts = await getPorts()

	// Filter only the ports that are not already on the links stash
	const newPorts = arrayDiff(
		rawPorts,
		links.map(link => link.port)
	)

	// Try to open and close them to see if they are working. Discart the ones
	// that can't be openned.
	const workingPorts = []
	for (let i = 0; i < newPorts.length; i++) {
		const [port] = rawPorts
		try {
			await openPort(port)
			await delay(10)
			await closePort(port)
			workingPorts.push(port)
		} catch (e) {}
	}

	// Create the new links
	const newLinks = workingPorts.map(port => createNewLink({ port }))

	// Finally, return the new links
	return newLinks
}

export async function refreshLinksInfo(links) {
	await Promise.all(links.map(refreshSingleLinkInfo))
}

export async function refreshLinksInfoIfNeeded(links) {
	await Promise.all(links.map(refreshSingleLinkInfoIfNeeded))
}

export async function syncLinksWithState(links, state) {
	const foundLinks = []
	const removedLinks = []
	const updatedLinks = []
	// Find updated/new links
	for (let stateIndex = 0; stateIndex < state.length; stateIndex++) {
		const sourceStateLink = state[stateIndex]
		// clone the state link
		const stateLink = { ...sourceStateLink }
		// Filter invalid ports
		stateLink.port = await getPortByFilter(stateLink.port)
		if (!stateLink.port) {
			// eslint-disable-next-line no-continue
			continue
		}
		// Check if there is a matching link
		const matchingLink = links.filter(link =>
			link.runtimeId === stateLink.runtimeId
		).pop()
		if (matchingLink) {
			mergeLinkWithStateLink(matchingLink, stateLink)
			updatedLinks.push(matchingLink)
			// eslint-disable-next-line no-continue
			continue
		}
		// If there is no matching link, create the new link
		foundLinks.push(createNewLink(stateLink))
	}
	// Find removed links
	links.forEach(link => {
		const matchingStateLink = state.filter(stateLink =>
			stateLink.runtimeId === link.runtimeId
		).pop()
		if (matchingStateLink) {
			return
		}
		// If there is no matching state link, remove the link
		removedLinks.push(link)
	})

	inPlaceArrayConcat(links, foundLinks)
	inPlaceArrayDiff(links, removedLinks)

	return {
		foundLinks,
		removedLinks,
		updatedLinks,
	}
}

export function saveLinksStateToLocalStorage(links) {
	logOpenCollapsed('Save state to localStorage')
	const state = links.map(link => ({
		...link,
		port : link.port.getInfo()
	}))
	localStorage.setItem('_qbwebserial_links_', JSON.stringify(state))
	log('State', state)
	logClose()
}
