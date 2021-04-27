import {
	refreshSingleLinkInfo,
	refreshSingleLinkInfoIfNeeded,
	createNewLink,
	mergeLinkWithStateLink,
} from './singleLink'

import {
	log,
	logClose,
	logOpenCollapsed,
} from './log'

import {
	getPorts,
	openPort,
	closePort,
	serializePort,
	unserializePort,
} from './serial'

import {
	arrayDiff,
	delay,
	inPlaceArrayConcat,
	inPlaceArrayDiff,
} from './utils'

export async function findDeadLinks(links) {
	// Find the link that don't have a port that is currently listed
	const ports = await getPorts()
	log('Current ports', ports)
	const linksWithoutPort = links.filter(link => ports.indexOf(link.port) === -1)
	log('Links without a port', linksWithoutPort)

	// Find the links that have the same port as another link
	const existing = new Map()
	const linksWithSamePort = links.filter(link => {
		if (existing.has(link.port)) {
			return true
		}
		existing.set(link.port, true)
		return false
	})
	log('Links with the same port as another link', linksWithSamePort)

	// Combine dead links
	const deadLinks = linksWithoutPort.concat(linksWithSamePort)

	return deadLinks
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

	// Double check if any of the new links match the existing ones, if so, remove
	logOpenCollapsed('Filtering links with UUIDs that are alredy on stash')
	const existingUuids = links.reduce((acc, link) => {
		acc.set(link.uuid, link)
		return acc
	}, new Map())

	log('Existing UUIDs', existingUuids)
	const newLinkWithNewUuid = newLinks.filter(link => {
		if (existingUuids.has(link.uuid)) {
			log('Found link with already existing uuid', link)
			return false
		}
		return true
	})
	log('Links with new unique UUIDs', newLinkWithNewUuid)
	logClose()

	return newLinkWithNewUuid
}

export async function findPossibleLinksByAvaiblePorts(links) {
	// Get all avaible ports
	const rawPorts = await getPorts()
	log('Current ports:', rawPorts)

	// The ports that are currently attached to a link
	const linkPorts = links.map(link => link.port)
	log('Ports attached to links:', linkPorts)

	// Filter only the ports that are not already on the links stash
	const newPorts = arrayDiff(
		rawPorts,
		linkPorts
	)
	log('Filtered ports (not attached to links):', newPorts)

	// Try to open and close them to see if they are working. Discart the ones
	// that can't be openned.
	const workingPorts = []
	for (let i = 0; i < newPorts.length; i++) {
		const [port] = newPorts
		try {
			await openPort(port)
			await delay(10)
			await closePort(port)
			workingPorts.push(port)
		} catch (e) {}
	}

	log('Working ports:', workingPorts)

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
		stateLink.port = await unserializePort(stateLink.port)
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

export async function saveLinksStateToLocalStorage(links) {
	logOpenCollapsed('Save state to localStorage')
	const state = await Promise.all(links.map(async (link) => ({
		...link,
		port : await serializePort(link.port)
	})))
	localStorage.setItem('_qbwebserial_links_', JSON.stringify(state))
	log('State', state)
	logClose()
}
