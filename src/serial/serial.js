import getConfig from 'next/config'

import {
	AVR,
} from './constants'

const {
	publicRuntimeConfig : {
		QUIRKBOT_USB_SERIAL_IDS,
	},
} = getConfig()

export async function getPorts() {
	return navigator.serial.getPorts()
}

export async function requestPorts(args) {
	return navigator.serial.requestPorts(args)
}

export async function openPort(port, options = { baudRate : AVR.BaudRateCommunication }) {
	await port.open(options)
}

export async function closePort(port, timeout = 1000) {
	await new Promise((resolve, reject) => {
		const timer = setTimeout(reject, timeout)
		async function close() {
			await port.close()
			clearTimeout(timer)
			resolve()
		}
		close()
	})
}

export function createPortHash(port) {
	const info = port.getInfo()
	return info.usbVendorId + info.usbProductId
}

export async function writeBytesToPort(port, bytes) {
	const writer = port.writable.getWriter()
	const data = new Uint8Array(bytes)
	await writer.write(data)
	writer.releaseLock()
}

export async function writeDataToFirstAvaiblePort(bytes) {
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

export function getUsbFilters({ bootloader, program }) {
	let filters = []
	if (bootloader) {
		filters = filters.concat(QUIRKBOT_USB_SERIAL_IDS.filter(d => d.isBootloader))
	}
	if (program) {
		filters = filters.concat(QUIRKBOT_USB_SERIAL_IDS.filter(s => !s.isBootloader))
	}
	return filters
}

export function generatePortId(port, index) {
	const info = port.getInfo()
	return `${info.usbVendorId}_${info.usbProductId}_${index}`
}

export async function unserializePort(id) {
	const ports = await getPorts()
	for (let i = 0; i < ports.length; i++) {
		const port = ports[i]
		if (id === generatePortId(port, i)) {
			return port
		}
	}
	return null
}

export async function serializePort(port) {
	const ports = await getPorts()
	for (let i = 0; i < ports.length; i++) {
		if (port === ports[i]) {
			return generatePortId(port, i)
		}
	}
	return null
}
