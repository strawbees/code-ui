import {
	arrayDiff,
	delay,
	pad,
	convertToTwoBytes,
	asyncSafeWhile,
	tryToExecute,
	generateUniqueId,
} from './utils'

import {
	log,
	logOpenCollapsed,
	logClose
} from './log'

import { parseIntelHex } from './hex'

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
	AVR,
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

export async function waitForMessageFromSingleLink(link, transformers = [], timeout = 0, openClosePort = true, portOptions = undefined) {
	// Open the port
	if (openClosePort) await openPort(link.port, portOptions)

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

export async function sendAndReceiveMessageToSingleLink(link, bytes, transformers = [], timeout = 0, openClosePort = true, portOptions = undefined) {
	// Open the port
	if (openClosePort) await openPort(link.port, portOptions)

	// Send the message
	await writeBytesToPort(link.port, bytes)

	// Wait for the message
	const message = await waitForMessageFromSingleLink(link, transformers, timeout, false)

	// Close the port
	if (openClosePort) await closePort(link.port)

	// Return the message
	return message
}

export async function sendMessageAndExpectExactOneByteResponseToSingleLink(link, message, expectedResponse, transformers = undefined, timeout = undefined, openClosePort = undefined, portOptions = undefined) {
	logOpenCollapsed('Sending message and expecting exact one by response...')
	log('Sending message:', message)
	const response = await sendAndReceiveMessageToSingleLink(link, message, transformers, timeout, openClosePort, portOptions)
	log('Received response:', response)
	if (response && response[0] === expectedResponse) {
		log('Response matched')
		logClose()
	} else {
		log(`Never received expected response "${expectedResponse}"`)
		logClose()
		throw new Error(`Never received expected response "${expectedResponse}"`)
	}
}

export async function testSingleLinkConnectionByReadingBootloaderInterface(link) {
	logOpenCollapsed('Testing single link by "reading bootloader interface"')

	let connected = false
	try {
		await sendMessageAndExpectExactOneByteResponseToSingleLink(
			link, [COMMANDS.ReadBootloaderInterface], AVR.SerialInterface, [], 50, false /* don't open/close port */
		)
		connected = true
		log('Connection is working.')
	} catch (e) {
		log('Connection is not working. Error', e)
	}
	logClose()
	return connected
}

export async function discoverSingleLinkUuid(link) {
	logOpenCollapsed('Aquiring UUID')
	let uuid = ''
	try {
		if (link.bootloader) {
			// The booloader will respond with the UUID if queried
			uuid = await sendAndReceiveMessageToSingleLink(
				link,
				[COMMANDS.ReadUUID],
				[
					new window.TransformStream(new SlicerTransformer(UUID_SIZE)),
					new window.TextDecoderStream()
				],
				50
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
	} catch (e) {
		log('Error trying to discover UUID', e)
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
	// Update every 30 seconds
	if (Date.now() - link.updated < 30000) {
		return
	}
	await refreshSingleLinkInfo(link)
}

export async function uploadHexToSingleLink(link, hexString, onUpdate = async () => {}) {
	logOpenCollapsed('Guarantee bootloader')
	await guaranteeSingleLinkEnterBootloaderMode(link)
	await onUpdate()
	logClose()

	logOpenCollapsed('Send firmware')
	let data = []
	parseIntelHex(hexString).data.forEach(o => data.push(o))
	data = pad(data, AVR.PageSize)
	await tryToExecute(() => sendFirmwareToSingleLinkWithConfidence(link, data), 10, 1000)
	await onUpdate()
	logClose()

	// Exit the bootloader mode. Here we don't want to "guarantee" the booloader
	// since there could firmwares that will send the board directly back to
	// bootloader mode (eg. bootloader updater).
	logOpenCollapsed('Exit bootloader mode')
	await exitSingleLinkBootloaderMode(link)
	logClose()
	await refreshSingleLinkBootloaderStatus(link)

	await onUpdate()
}

export async function guaranteeSingleLinkExitBootloaderMode(link) {
	if (await discoverSingleLinkBootloaderStatus(link)) {
		logOpenCollapsed('Exit bootloader mode')
		await exitSingleLinkBootloaderMode(link)
		log('Completed "exit bootloader" routine')
		logClose()
		logOpenCollapsed('Confirm not on bootloader mode')
		await refreshSingleLinkBootloaderStatus(link)
		if (link.bootloader) {
			throw new Error('Could not confirm that board is not on bootloader mode.')
		}
		log('Confirmed not in bootloader mode')
		logClose()
	} else {
		log('Already not on bootloader mode')
	}
}

export async function guaranteeSingleLinkEnterBootloaderMode(link) {
	if (!await discoverSingleLinkBootloaderStatus(link)) {
		logOpenCollapsed('Enter bootloader mode')
		await enterSingleLinkBootloaderMode(link)
		log('Completed "enter bootloader" routine')
		logClose()
		logOpenCollapsed('Confirm bootloader mode')
		await refreshSingleLinkBootloaderStatus(link)
		if (!link.bootloader) {
			throw new Error('Could not confirm that board is on bootloader mode.')
		}
		log('Confirmed in bootloader mode')
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
	// if (!bootloader) {
	// 	// When trying to exit the bootloader, the board will first respond after
	// 	// the "exit" command is received, and only then it will reboot.
	// 	log('Sending command to exit bootloader...')
	// 	const message = [COMMANDS.ExitBootloader]
	// 	try {
	// 		await sendMessageAndExpectExactOneByteResponseToSingleLink(
	// 			link, message, AVR.Ok, [], 50, true, { baudRate : AVR.BaudRateUpload }
	// 		)
	// 	} catch (e) {
	// 		log('Error trying to exit bootloader, continuing anyway. Error:', e)
	// 	}
	// } else {
	// 	// When entering bootloader, the board will NOT respond after the "enter"
	// 	// command is received. It will only reboot immediatly.
	// 	log('Sending command to enter bootloader')
	// 	log('Opening port...')
	// 	await openPort(link.port, { baudRate : AVR.BaudRateUpload })
	// 	const command = bootloader ? COMMANDS.EnterBootloader : COMMANDS.ExitBootloader
	// 	log('Sending command:', command)
	// 	await writeBytesToPort(link.port, [COMMANDS.EnterBootloader])
	// 	await delay(10)
	// 	log('Closing port...')
	// 	await closePort(link.port)
	// }

	log('Opening port...')
	const command = bootloader ? COMMANDS.EnterBootloader : COMMANDS.ExitBootloader
	const baudRate = bootloader ? COMMANDS.BaudRateCommunication : COMMANDS.BaudRateUpload
	await openPort(link.port, { baudRate })
	log('Sending command:', bootloader ? 'enter' : 'exit', command)
	await writeBytesToPort(link.port, [command])
	await delay(10)
	log('Closing port...')
	await closePort(link.port)

	// Now the device should reconnect, so we monitor the ports
	logOpenCollapsed('Waiting for new device...')
	try {
		// Update the link connections
		const newPort = await waitForPortToAppear(link)
		link.port = newPort
		log('Link was updated with a new device port', link)
	} catch (e) {
		log('Link as not updated, because a new device never appeared ', e)
		logClose()
		throw e
	}

	logClose()
}

export async function waitForPortToAppear() {
	logOpenCollapsed('Waiting for port to appear...')
	let tries = 0
	let port = null

	const lastPorts = await getPorts()
	await asyncSafeWhile(
		async () => tries < 50 && !port,
		async () => {
			logOpenCollapsed('Appear try', tries)
			log('Last ports', lastPorts)

			const currentPorts = await getPorts()
			log('Current ports', currentPorts)

			port = arrayDiff(
				currentPorts,
				lastPorts
			).pop()
			if (port) {
				log('Port appeared!', port)
			}

			logClose()

			tries++
			await delay(200)
		}
	)

	if (port) {
		log('Port appeared!', port)
	} else {
		log('Port never appeared.')
		throw new Error('Port never appeared.')
	}
	logClose()
	// We got a new port!
	return port
}

export async function sendFirmwareToSingleLinkWithConfidence(link, data) {
	// Open the port only once before the whole process
	await openPort(link.port, { baudRate : AVR.BaudRateUpload })
	try {
	// Test if link is connected
		let connected = await testSingleLinkConnectionByReadingBootloaderInterface(link)
		log('Test link connection before upload', connected)
		if (!connected) {
			throw new Error('Link is not connected')
		}

		// Send the data
		await sendFirmwareToSingleLink(link, data)

		// Test if the link is still connected
		await delay(30)
		connected = await testSingleLinkConnectionByReadingBootloaderInterface(link)
		log('Test link connection, after upload', connected)
		if (!connected) {
			throw new Error('Link is not connected')
		}
	} catch (e) {
	// Make sure to close the port in case of an error
		try {
			await closePort(link.port)
		} catch (ee) {
		// Ignore errors here, cause the error is because the port is already
		// closed, we don't care and are good to go.
			log('Error while making sure port is closed, ignoring.', ee)
		}
		throw e
	}
	// Close the port in the end of the process
	await closePort(link.port)
}

export async function sendFirmwareToSingleLink(link, data) {
	await AVRSetProgrammingAddress(link, AVR.ProgramAddress)
	await AVRWritePagesRecursivelly(link, data)
}

export async function AVRSetProgrammingAddress(link, pageNumber) {
	logOpenCollapsed('Set programming address for page:', pageNumber)
	const address = pageNumber * (AVR.PageSize / 2)
	const message = [COMMANDS.SetCurrentAddress, ...convertToTwoBytes(address)]
	try {
		await sendMessageAndExpectExactOneByteResponseToSingleLink(
			link, message, AVR.Ok, [], 50, false /* don't open/close port */
		)
		log('Programming address set!')
	} catch (e) {
		log('Programming address not set.')
		logClose()
		throw new Error('Could not set programming address.')
	}
	logClose()
}

export async function AVRWritePage(link, data, pageNumber) {
	logOpenCollapsed('Writing page:', pageNumber)

	const pageData = data.slice(
		pageNumber * AVR.PageSize,
		(pageNumber + 1) * AVR.PageSize
	)
	const message = [
		COMMANDS.BlockWrite,
		...convertToTwoBytes(AVR.PageSize),
		AVR.FlashType
	].concat(pageData)
	try {
		await sendMessageAndExpectExactOneByteResponseToSingleLink(
			link, message, AVR.Ok, [], 100, false /* don't open/close port */
		)
		log('Page written!')
	} catch (e) {
		log('Could not write page, error:', e)
		logClose()
		throw new Error('Could write page')
	}

	logClose()
}

export async function AVRWritePagesRecursivelly(link, data) {
	logOpenCollapsed('Writing pages')
	const numPages = data.length / AVR.PageSize
	log('Total pages:', numPages)
	for (let page = 0; page < numPages; page++) {
		try {
			await AVRWritePage(link, data, page)
		} catch (e) {
			logClose()
			throw	e
		}
	}
	logClose()
}
