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

export async function requestAccess() {
	// Check if permission settings have been saved already
	let bootloaderAllowed = browserStorage.get('web-serial', 'bootloaderAllowed')
	let programAllowed = browserStorage.get('web-serial', 'programAllowed')
	if (bootloaderAllowed && programAllowed) {
		// Success!
		return
	}
	// Make a function that check if anything was detected and save the result
	// to the permissions storage.
	function resolveAllowed() {
		if (bootloaderDetected) {
			bootloaderAllowed = true
			browserStorage.set('web-serial', 'bootloaderAllowed', true)
		}
		if (programDetected) {
			programAllowed = true
			browserStorage.set('web-serial', 'programAllowed', true)
		}
	}
	// Initial check for permissions (if there's a device already connected)
	let bootloaderDetected = await detectInPorts({ bootloader : true })
	let programDetected = await detectInPorts({ program : true })
	resolveAllowed()
	if (bootloaderAllowed && programAllowed) {
		// Success!
		return
	}
	// If we don't have anything allowed yet...
	if (!bootloaderAllowed && !programAllowed) {
		// Request access to both
		await refreshPorts({ bootloader : true, program : true })
		bootloaderDetected = await detectInPorts({ bootloader : true })
		programDetected = await detectInPorts({ program : true })
		resolveAllowed()
		// If nothing was detected, we are out of luck and this routine can end now.
		if (!bootloaderAllowed && !programAllowed) {
			throw new Error('No device is connected.')
		}
	}
	// At this point, at least one device was allowed.
	if (programAllowed) {
		// We can be in these three states:
		// 1. No device is connected (no port avaiable)
		// 2. Device is connected on bootloader mode (no port avaiable - no permissions yet)
		// 3. Device is connected on program mode (port should be avaible)

		// Anyway, we send a message to put the board on bootloader mode.
		// If state is 1 or 2, it will throw an error, but we can just skip it.
		// If state is 3, the board will disconnect and connect again in bootloader
		try {
			await writeDataToFirstAvaiblePort([0xb]) // 0xb == "enter bootloader"
		} catch (e) {
			// State was 1 or 2, ignorig...
		}

		// Request access, but are only interested in the bootloader
		await refreshPorts({ bootloader : true })
		bootloaderDetected = await detectInPorts({ bootloader : true })
		resolveAllowed()
		// If the booloader was detected, great! We have access to both!
		if (bootloaderAllowed) {
			// For convenience, we exit the bootloader mode
			await writeDataToFirstAvaiblePort([0x45]) // E == "exit bootloader"
			// Success!
			return
		}
		// If was not detected it means that either we are in state 1, or that we
		// were on state 3, but we failed to put the board in bootloader mode.
		// Anyway, we can't do anything here.
		throw new Error('Couldn\'t put the board in booloader mode and detect it.')
	}

	if (bootloaderAllowed) {
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

		// Request access, but are only interested in the program
		await refreshPorts({ program : true })
		programDetected = await detectInPorts({ program : true })
		resolveAllowed()
		// If the program was detected, great! We have access to both!
		if (programAllowed) {
			// Success!
			return
		}
		// If was not detected it means that either we are in state 1, or that we
		// were on state 2, but we failed to enter program mode.
		// Anyway, we can't do anything here.
		throw new Error('Couldn\'t put the board in program mode and detect it.')
	}

	throw new Error('Couldn\'t request access')
}

export async function init() {
	console.log('initqbserial', QUIRKBOT_USB_SERIAL_IDS)
}
