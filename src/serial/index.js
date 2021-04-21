import * as browserStorage from 'src/utils/browserStorage'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		QUIRKBOT_USB_SERIAL_IDS
	}
} = getConfig()

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
function getUSBFilters({ bootloader, program }) {
	let filters = []
	if (bootloader) {
		filters = filters.concat(QUIRKBOT_USB_SERIAL_IDS.filter(d => d.isBootloader))
	}
	if (program) {
		filters = filters.concat(QUIRKBOT_USB_SERIAL_IDS.filter(s => !s.isBootloader))
	}
	return filters
}
async function detectInPorts({ bootloader, program }) {
	const filters = getUSBFilters({ bootloader, program })
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
		filters = filters.concat(getUSBFilters({ bootloader : true }))
	}
	if (program) {
		filters = filters.concat(getUSBFilters({ program : true }))
	}

	try {
		await navigator.serial.requestPort({ filters })
	}	catch (e) {
		console.log('Web Serial request ports error:', e)
	}
}

export async function setRequestAccessStatus({ bootloader, program }) {
	browserStorage.set('web-serial', 'bootloader-detected', bootloader)
	browserStorage.set('web-serial', 'program-detected', program)
}

export async function getRequestAccessStatus() {
	const bootloader = browserStorage.get('web-serial', 'bootloader-detected') || false
	const program = browserStorage.get('web-serial', 'program-detected') || false
	return [bootloader, program]
}

export async function requestAccess() {
	// Check if permission settings have been saved already
	let [bootloader, program] = await getRequestAccessStatus()
	if (bootloader && program) {
		// Success!
		return
	}
	// Initial check for permissions (if there's a device already connected)
	bootloader = await detectInPorts({ bootloader : true })
	program = await detectInPorts({ program : true })
	setRequestAccessStatus({ bootloader, program })
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
		setRequestAccessStatus({ bootloader, program })
		// If nothing was detected, we are out of luck and this routine can end now.
		if (!bootloader && !program) {
			return
		}
	}
	// At this point, at least one device was allowed.
	if (program) {
		// We can be in these three states:
		// 1. No device is connected (no port avaiable)
		// 2. Device is connected on bootloader mode (no port avaiable - probably no permissions yet)
		// 3. Device is connected on program mode (port should be avaible)

		// Anyway, we send a message to put the board on bootloader mode.
		// If state is 1 or 2, it will throw an error, but we can just skip it.
		// If state is 3, the board will disconnect and connect again in bootloader
		try {
			await writeDataToFirstAvaiblePort([0xb]) // 0xb == "enter bootloader"
		} catch (e) {
			// State was 1 or 2, ignorig...
		}

		// There's a chance the bootloader is actually already allowed, but the
		// permissions have been cleared (eg. localStorage deleted). To avoid an
		// unecessary prompt on this case, we wait a little bit (so the new device
		// has enought time to be picked up by the OS), and try to detected it,
		// before refreshing the posts
		await new Promise(r => setTimeout(r, 200))
		bootloader = await detectInPorts({ bootloader : true })
		setRequestAccessStatus({ bootloader, program })
		// If the bootloader was detected, great! We are done.
		if (bootloader) {
			// For convenience, we exit the bootloader mode
			await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
			// Success!
			return
		}

		// Ok, if we got here, maybe the bootloader has not permissions yet. In
		// that case, request access (only for bootloader)
		await refreshPorts({ bootloader : true })
		bootloader = await detectInPorts({ bootloader : true })
		setRequestAccessStatus({ bootloader, program })
		// If the bootloader was detected, great! We are done.
		if (bootloader) {
			// For convenience, we exit the bootloader mode
			await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
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
		// 3. Device is connected on program mode (no port avaiable - no permissions yet)

		// Anyway, we send a message to exit bootloader mode.
		// If state is 1 or 3, it will throw an error, but we can just skip it.
		// If state is 2, the board will disconnect and connect again in bootloader
		try {
			await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
		} catch (e) {
			// State was 1 or 3, ignorig...
		}

		// There's a chance the program mode is actually already allowed, but the
		// permissions have been cleared (eg. localStorage deleted). To avoid an
		// unecessary prompt on this case, we wait a little bit (so the new device
		// has enought time to be picked up by the OS), and try to detected it,
		// before refreshing the posts
		await new Promise(r => setTimeout(r, 200))
		program = await detectInPorts({ program : true })
		setRequestAccessStatus({ bootloader, program })
		// If the program was detected, great! We are done.
		if (program) {
			// For convenience, we exit the bootloader mode
			await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
			// Success!
			return
		}

		// Ok, if we got here, maybe the bootloader has not permissions yet. In
		// that case, request access (only for bootloader)
		await refreshPorts({ program : true })
		program = await detectInPorts({ program : true })
		setRequestAccessStatus({ bootloader, program })

		// Nothing else to do here
	}
}

export async function init() {
	// console.log('initqbserial', QUIRKBOT_USB_SERIAL_IDS)
}

export async function getModel() {
	return { quirkbots : [] }
}
