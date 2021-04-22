import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		QUIRKBOT_USB_SERIAL_IDS
	}
} = getConfig()

export async function getPorts() {
	return navigator.serial.getPorts()
}

export async function requestPorts(args) {
	return navigator.serial.requestPorts(args)
}

export async function openPort(port, baudRate = 9600) {
	await port.open({ baudRate })
}

export async function closePort(port) {
	await port.close()
}

export async function writeBytesToPort(port, bytes) {
	const writer = port.writable.getWriter()
	const data = new Uint8Array(bytes)
	await writer.write(data)
	writer.releaseLock()
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

export async function getPortByFilter({ usbVendorId, usbProductId }) {
	const ports = await getPorts()
	for (let i = 0; i < ports.length; i++) {
		const port = ports[i]
		const info = port.getInfo()
		if (info.usbVendorId === usbVendorId && info.usbProductId === usbProductId) {
			return port
		}
	}
	return null
}
