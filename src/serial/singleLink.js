import {
	arrayDiff,
	arrayMedian,
	delay,
	pad,
	safeWhile,
	asyncSafeWhile,
	tryToExecute,
	generateUniqueId,
} from './utils'

import {
	log,
	logOpen,
	logOpenCollapsed,
	logClose
} from './log'

import { parseIntelHex } from './hex'

import {
	fromMIDI,
	getMIDIInputs,
	getMIDIOutputs,
	addMIDIMessageListenerToInput,
	removeMIDIMessageListenerFromInput,
	sendMIDIToOutput,
	openMIDIPort,
	closeMIDIPort,
	filterValidConnections
} from './midi'

import {
	getUsbFilters,
	writeBytesToPort,
	getPorts,
	openPort,
	closePort,
} from './serial'

import {
	SlicerTransformer,
	RawSerialReportTransformer
} from './transformers'

import {
	COMMANDS,
	REPORT_DELIMITERS,
	PAGE_SIZE,
	UUID_SIZE,
} from './constants'

export function createNewLink(data) {
	return {
		runtimeId : data.runtimeId || generateUniqueId(),
		updated   : data.updated || Date.now(),
		...data
	}
}

export function mergeLinkWithStateLink(link, stateLink) {
	Object.keys(stateLink)
		// .filter(key => key !== 'input' && key !== 'output' && key !== 'runtimeId')
		.forEach(key => link[key] = stateLink[key])
}

export async function waitForMessageFromSingleLink(link, transformers = [], timeout = 0, openClosePort = true) {
	// Open the port
	if (openClosePort) await openPort(link.port)

	// Create the variable that will hold the message
	let message

	// Create the reader stream
	let decoder = new window.TransformStream()
	const inputDone = link.port.readable.pipeTo(decoder.writable)
	let inputStream = decoder.readable
	transformers.forEach(transformer => {
		inputStream = inputStream.pipeThrough(transformer)
	})
	let reader = inputStream.getReader()

	// Create the read loop that will set the message as the first message from
	// the stream
	async function readLoop() {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { value, done } = await reader.read()
			if (typeof value !== 'undefined') {
				message = value
			}
			if (done) {
				reader.releaseLock()
				break
			}
		}
	}
	readLoop()

	// Create a function that will wait for the message to be filled (or timeout)
	const deadline = Date.now() + timeout
	function waitForMesage() {
		return new Promise((resolve) => {
			function check() {
				if (message || Date.now() > deadline) {
					resolve()
					return
				}
				setTimeout(check, 0)
			}
			check()
		})
	}
	await waitForMesage()

	// Close the stream
	await reader.cancel()
	await inputDone.catch(() => {})
	reader = null
	decoder = null
	// Close the port
	if (openClosePort) await closePort(link.port)

	// Return the message
	return message
}

export async function sendAndReceiveMessageToSingleLink(link, bytes, transformers = [], timeout = 0, openClosePort = true) {
	// Open the port
	if (openClosePort) await openPort(link.port)

	// Send the message
	await writeBytesToPort(link.port, bytes)

	// Wait for the message
	const message = await waitForMessageFromSingleLink(link, transformers, timeout, false)

	// Close the port
	if (openClosePort) await closePort(link.port)

	// Return the message
	return message
}

export async function testSingleLinkConnectionByMessageEcho(link) {
	logOpenCollapsed('Testing single link by "message echo"')
	let connected = false
	const key1 = Math.floor(Math.random() * 256)
	const key2 = Math.floor(Math.random() * 256)
	const fn = e => {
		const message = fromMIDI(e.data)
		if (message[1] === key1 && message[2] === key2) {
			log(`Midi response received (expected ${key1}, ${key2})`, message[1], message[2])
			connected = true
		}
	}
	log(`Sending message: ${key1}, ${key2}`, link)
	try {
		await sendAndReceiveMessageToSingleLink(link, [COMMANDS.Sync, key1, key2], fn, 30)
	} catch (e) {
		log('Failed to receive message', e)
	}

	if (!connected) {
		log(`Never received midi response (expected ${key1}, ${key2})`)
	}
	logClose()
	return connected
}

export async function discoverSingleLinkUuid(link) {
	logOpenCollapsed('Aquiring UUID')
	let uuid = ''
	if (link.bootloader) {
		// The booloader will respond with the UUID if queried
		uuid = await sendAndReceiveMessageToSingleLink(
			link,
			[COMMANDS.ReadUUID],
			[
				new window.TransformStream(new SlicerTransformer(UUID_SIZE)),
				new window.TextDecoderStream()
			],
			5
		)
	} else {
		// Programs will broadcast the UUID constantly, so we need to monitor it
		uuid = await waitForMessageFromSingleLink(
			link,
			[
				new window.TransformStream(
					new RawSerialReportTransformer(
						REPORT_DELIMITERS.Start, REPORT_DELIMITERS.UUID
					)
				),
				new window.TextDecoderStream()
			],
			1000
		)
	}
	log('UUID:', uuid)
	logClose()
	return uuid
}

export async function discoverSingleLinkBootloaderStatus(link) {
	logOpenCollapsed('Aquiring Bootloader status')
	let bootloaderStatus = false
	const { usbProductId, usbVendorId } = link.port.getInfo()
	const filters = getUsbFilters({ bootloader : true })
	filters.forEach((d) => {
		if (bootloaderStatus) {
			return
		}
		if (d.usbProductId === usbProductId && d.usbVendorId === usbVendorId) {
			bootloaderStatus = true
		}
	})
	log('Bootloader status:', bootloaderStatus)
	logClose()
	return bootloaderStatus
}

export async function discoverSingleLinkMidiEnabledStatus(link) {
	logOpenCollapsed('Aquiring Midi Enabled status')
	let midiEnabledStatus
	// if we were able to detect bootloader, midi must be enabled
	if (link.bootloader) {
		midiEnabledStatus = true
	} else {
		midiEnabledStatus = link.uuid.indexOf('QB01') === 0 || link.uuid.indexOf('QB02') === 0
	}
	log('Midi Enabled status:', midiEnabledStatus)
	logClose()
	return midiEnabledStatus
}

export async function refreshSingleLinkUuid(link) {
	link.uuid = await discoverSingleLinkUuid(link)
}

export async function refreshSingleLinkBootloaderStatus(link) {
	link.bootloader = await discoverSingleLinkBootloaderStatus(link)
}

export async function refreshSingleLinkMidiEnabledStatus(link) {
	link.midi = await discoverSingleLinkMidiEnabledStatus(link)
}

export async function refreshSingleLinkInfo(link) {
	await refreshSingleLinkBootloaderStatus(link)
	await refreshSingleLinkUuid(link)
	await refreshSingleLinkMidiEnabledStatus(link)
	link.updated = Date.now()
}

export async function refreshSingleLinkInfoIfNeeded(link) {
	// Dont update too frequently
	if (Date.now() - link.updated < 5000) {
		return
	}
	await refreshSingleLinkInfo(link)
}

export async function uploadHexToSingleLink(link, hexString, onUpdate = () => {}) {
	logOpen('Guarantee bootloader')
	await guaranteeSingleLinkEnterBootloaderMode(link)
	onUpdate()
	logClose()

	logOpen('Send firmware')
	let data = []
	parseIntelHex(hexString).data.forEach(o => data.push(o))
	data = pad(data, PAGE_SIZE)
	await tryToExecute(() => sendFirmwareToSingleLinkWithConfidence(link, data), 10, 1000)
	onUpdate()
	logClose()

	logOpen('Exit bootloader')
	await exitSingleLinkBootloaderMode(link)
	onUpdate()
	logClose()

	await refreshSingleLinkInfo(link)
	onUpdate()
}

export async function guaranteeSingleLinkExitBootloaderMode(link) {
	if (await discoverSingleLinkBootloaderStatus(link)) {
		logOpen('Exit bootloader mode')
		await exitSingleLinkBootloaderMode(link)
		logClose()
		logOpen('Confirm not on bootloader mode')
		// Add a delay before trying to confirm bootloader status, as Quirkbot
		// takes a few seconds to initialize (initial led blink animation), so
		// we dont get a false positive
		await delay(3000)
		await refreshSingleLinkInfo(link)
		if (link.bootloader) {
			throw new Error('Could not confirm that board is not on bootloader mode.')
		}
		logClose()
	} else {
		log('Already not on bootloader mode')
	}
}

export async function guaranteeSingleLinkEnterBootloaderMode(link) {
	if (!await discoverSingleLinkBootloaderStatus(link)) {
		logOpen('Enter bootloader mode')
		await enterSingleLinkBootloaderMode(link)
		logClose()
		logOpen('Confirm bootloader mode')
		await refreshSingleLinkInfo(link)
		if (!link.bootloader) {
			throw new Error('Could not confirm that board is on bootloader mode.')
		}
		logClose()
	} else {
		log('Already on bootloader mode')
	}
}

export async function enterSingleLinkBootloaderMode(link) {
	await controlSingleLinkBootloaderMode(true, link)
}

export async function exitSingleLinkBootloaderMode(link) {
	await controlSingleLinkBootloaderMode(false, link)
}

export async function controlSingleLinkBootloaderMode(bootloader, link) {
	// Send the command for the board to enter/exit booloader mode
	log('Send command')
	// Send the message
	await writeBytesToPort(link.port, [bootloader ? COMMANDS.EnterBootloader : COMMANDS.ExitBootloader])

	// Wait for the connection disapear, and a new one to appear
	logOpenCollapsed('Wait connections to appear/disapear')
	let addedConections
	try {
		const connectionHistory = await Promise.all([
			waitForSingleLinkConnectionToAppear(link)
		])
		addedConections = connectionHistory.pop()
	} catch (e) {
		log('New connection never appeared, continuing with current', e)
		addedConections = {
			port : link.port,
		}
	}
	log('Added connections', addedConections)

	logClose()

	// Update the link connections
	link.port = addedConections.port
}

export async function waitForSingleLinkConnectionToAppear() {
	let lastPorts = await getPorts()
	log('Original ports', lastPorts)

	let tries = 0
	let port = null

	await asyncSafeWhile(
		async () => tries < 40 && !port,
		async () => {
			logOpen('Appear try', tries)

			const currentPorts = await getPorts()
			port = port || arrayDiff(
				currentPorts,
				lastPorts
			).shift()
			lastPorts = currentPorts
			log('Current ports', currentPorts)

			logClose()

			tries++
			await delay(100)
		}
	)

	if (!port) {
		log('NEVER appeared')
		throw new Error('Port never appeared.')
	}
	// We got new inputs and outputs!
	log('appeared')
	return {
		port
	}
}

export async function sendFirmwareToSingleLinkWithConfidence(link, data) {
	// TODO: find a way to send data with confidence. As there is a problem
	// with Quirkbots on bootloader mode on Mac not firing onmidimessage, we
	// cannot rely the testSingleLinkConnectionByMessageEcho to determine if
	// the transmission is successfull

	// Test if link is connected
	let connected = await testSingleLinkConnectionByMessageEcho(link)
	log('Test link connection before upload', connected)
	if (!connected) {
		// throw new Error('Link is not connected')
		log('Link not connected before upload. Doing nothing...', connected)
	}

	// Send the data
	await sendFirmwareToSingleLink(link, data)

	// Test if the link is still connected
	await delay(30)
	connected = await testSingleLinkConnectionByMessageEcho(link)
	log('Test link connection, after upload', connected)
	if (!connected) {
		// throw new Error('Link is not connected')
		log('Link not connected after upload. Doing nothing...', connected)
	}
}

export async function sendFirmwareToSingleLink(link, data) {
	const totalBytes = data.length
	const speedRate = 1 // 4 empirically found best value
	const estimatedDuration = (totalBytes / speedRate) + 1000
	log('Send StartFirmware command', 'Total bytes', totalBytes)
	log('Transfer estimated duration', estimatedDuration)
	await sendMIDIToOutput(
		link.output,
		COMMANDS.StartFirmware, 0, 0
	)
	const transferStartRef = window.performance.now() + 100
	logOpenCollapsed('Data')
	try {
		for (let i = 0; i < data.length; i += 2) {
			log('Send Data command', data[i], data[i + 1])
			sendMIDIToOutput(
				link.output,
				COMMANDS.Data, data[i], data[i + 1],
				transferStartRef + (i / speedRate)
			)
		}
	} catch (e) {
		// Catching this error here just to close the log, throw the error again
		// so the parent process can catch it.
		logClose()
		throw e
	}
	logClose()
	const remainingTime = estimatedDuration - (window.performance.now() - transferStartRef)
	log('Waiting remaining estimated time...', remainingTime)
	await delay(remainingTime)
	log('Transfer complete!')
}
