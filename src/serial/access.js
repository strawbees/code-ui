import * as browserStorage from 'src/utils/browserStorage'

import {
	delay,
} from './utils'

import {
	log,
	logOpen,
	logOpenCollapsed,
	logClose,
} from './log'

import {
	getUsbFilters,
	writeDataToFirstAvaiblePort,
} from './serial'

import {
	createNewLink,
	refreshSingleLinkInfo,
	uploadHexToSingleLink,
} from './singleLink'

import {
	LINK_PERMISSION_TYPE,
} from './constants'

export async function detectPort({ bootloader, program }) {
	const filters = getUsbFilters({ bootloader, program })
	let detected
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
				detected = port
			}
		})
	})
	return detected
}

export async function refreshPorts({ bootloader, program }) {
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

export async function setRequestAccessStatus({ bootloader, program, transientBootloader }) {
	if (typeof bootloader !== 'undefined') {
		browserStorage.set('web-serial', 'bootloader-detected', !!bootloader)
	}
	if (typeof program !== 'undefined') {
		browserStorage.set('web-serial', 'program-detected', !!program)
	}
	if (typeof transientBootloader !== 'undefined') {
		browserStorage.set('web-serial', 'transient-bootloader-detected', !!transientBootloader)
	}
}

export async function createLinkFromPort(port) {
	logOpenCollapsed('Create link from port')
	log('A port was detected. Creating a temporary link with it...')
	const link = createNewLink({ port })
	await refreshSingleLinkInfo(link)
	const version = Number.parseInt(link.uuid.slice(2, 4), 10)
	if (link.bootloader) {
		if (version >= 2) {
			link.permissionType = LINK_PERMISSION_TYPE.BootloaderUpToDate
		} else if (version >= 1) {
			link.permissionType = LINK_PERMISSION_TYPE.BootloaderNeedsUpdate
		} else {
			link.permissionType = LINK_PERMISSION_TYPE.BootloaderNotUpdatable
		}
	} else if (!link.bootloader) {
		if (version >= 2) {
			link.permissionType = LINK_PERMISSION_TYPE.ProgramUpToDate
		} else if (version >= 1) {
			link.permissionType = LINK_PERMISSION_TYPE.ProgramNeedsUpdate
		} else {
			link.permissionType = LINK_PERMISSION_TYPE.ProgramNotUpdatable
		}
	}
	log('Link:', link)
	logClose()
	return link
}

export async function handleTemporaryLinkRequestAccess(link, bootloaderHex, programHex) {
	logOpenCollapsed('Handling temporary link')
	log('Link:', link)
	switch (link.permissionType) {
		case LINK_PERMISSION_TYPE.ProgramUpToDate:
			log('Program is up to date.')
			log('Granting permission for: program.')
			await setRequestAccessStatus({ program : true })

			log('Try to figure out if there is already access to bootloader.')
			// eslint-disable-next-line no-case-declarations
			const [bootloaderAccessStatus] = await getRequestAccessStatus()
			if (!bootloaderAccessStatus) {
				log('No access to bootloader.')
				log('Enter bootloader...')

				log('Sending message to enter bootloader...')
				try {
					await writeDataToFirstAvaiblePort([0xb]) // 0xb == "enter bootloader"
				} catch (e) {}
				log('Wating...')
				await delay(3000)

				log('Tring to detect bootloader port automatically...')
				// eslint-disable-next-line no-case-declarations
				const possibleBootloaderPort = await detectPort({ bootloader : true })
				if (possibleBootloaderPort) {
					log('A port was detected. Safe to assume we have access.')
					log('Granting permission for: bootloader.')
					await setRequestAccessStatus({ bootloader : true })
					log('End of request access, there is nothing we can do anymore.')
				} else {
					log('No port detetect. Likely no access.')
					log('End of request access, there is nothing we can do anymore.')
				}
			} else {
				log('Already have bootloader access access.')
				log('End of request access, there is nothing we can do anymore.')
			}
			break
		case LINK_PERMISSION_TYPE.ProgramNeedsBootloaderUpdate:
			log('Program needs bootloader update.')
			log('Granting permission for: program.')
			await setRequestAccessStatus({ program : true })

			log('Enter bootloader...')
			log('Sending message to enter bootloader...')
			try {
				await writeDataToFirstAvaiblePort([0xb]) // 0xb == "enter bootloader"
			} catch (e) {}
			log('Wating...')
			await delay(3000)

			log('Tring to detect bootloader port automatically...')
			// eslint-disable-next-line no-case-declarations
			const possibleOutdatedBootloaderPort = await detectPort({ bootloader : true })
			if (possibleOutdatedBootloaderPort) {
				log('A port was detected. Safe to assume we have access.')
				log('Granting permission for: bootloader.')
				await setRequestAccessStatus({ bootloader : true })
				log('End of request access, there is nothing we can do anymore.')
			} else {
				log('No port detetect. Likely no access.')
				log('End of request access, there is nothing we can do anymore.')
			}
			break
		case LINK_PERMISSION_TYPE.ProgramBootloaderNotUpdatable:
			log('Program has a  bootloader that is not updatable.')
			log('Granting permission for: program.')
			await setRequestAccessStatus({ program : true })
			log('End of request access, there is nothing we can do anymore.')
			break
		case LINK_PERMISSION_TYPE.BootloaderUpToDate:
			log('Bootloader is up to date.')
			log('Granting permission for: bootloader.')
			await setRequestAccessStatus({ bootloader : true })

			log('Try to figure out if there is already access to program.')
			// eslint-disable-next-line no-case-declarations
			const [, programAccessStatus] = await getRequestAccessStatus()
			if (!programAccessStatus) {
				log('No access to program.')
				log('Uploading factory program...')
				try {
					await uploadHexToSingleLink({ link, hexString : programHex, waitForNewDevice : false })
					log('Wating...')
					await delay(3000)

					log('Tring to detect program port automatically...')
					// eslint-disable-next-line no-case-declarations
					const possibleProgramPort = await detectPort({ program : true })
					if (possibleProgramPort) {
						log('A port was detected. Safe to assume we have access.')
						log('Granting permission for: program.')
						await setRequestAccessStatus({ program : true })
						log('End of request access, there is nothing we can do anymore.')
					} else {
						log('No port detetect. Likely no access.')
						log('End of request access, there is nothing we can do anymore.')
					}
				} catch (e) {
					log('Error uploading factory program.')
					log('End of request access, there is nothing we can do anymore.')
				}
			} else {
				log('Already have program access.')
				log('For convenience, sending message to exit bootloader...')
				try {
					await writeDataToFirstAvaiblePort([0x45]) // 0x45 == "exit bootloader"
				} catch (e) {}
				log('End of request access, there is nothing we can do anymore.')
			}

			break
		case LINK_PERMISSION_TYPE.BootloaderNeedsUpdate:
			log('Bootloader needs update.')
			// log('Granting permission for: transient bootloader.')
			// await setRequestAccessStatus({ transientBootloader : true })

			log('Uploading bootloader updater...')
			try {
				await uploadHexToSingleLink({ link, hexString : bootloaderHex, waitForNewDevice : false })
				log('Wating...')
				await delay(1000)

				log('Tring to detect bootloader port automatically...')
				// eslint-disable-next-line no-case-declarations
				const possibleUpdatedBootloaderPort = await detectPort({ bootloader : true })
				if (possibleUpdatedBootloaderPort) {
					log('A port was detected. Safe to assume we have access.')
					log('Granting permission for: bootloader.')
					await setRequestAccessStatus({ bootloader : true })
					log('End of request access, there is nothing we can do anymore.')
				} else {
					log('No port detetect. Likely no access.')
					log('End of request access, there is nothing we can do anymore.')
				}
			} catch (e) {
				log('Error uploading bootloader updater.')
				log('End of request access, there is nothing we can do anymore.')
			}
			break
		case LINK_PERMISSION_TYPE.BootloaderNotUpdatable:
			log('Bootloader is not updatable')
			// log('Granting permission for: transient bootloader.')
			// await setRequestAccessStatus({ transientBootloader : true })

			log('Uploading factory program...')
			try {
				await uploadHexToSingleLink({ link, hexString : programHex, waitForNewDevice : false })
				log('Wating...')
				await delay(1000)

				log('Tring to detect program port automatically...')
				// eslint-disable-next-line no-case-declarations
				const possibleProgramPort = await detectPort({ program : true })
				if (possibleProgramPort) {
					log('A port was detected. Safe to assume we have access.')
					log('Granting permission for: program.')
					await setRequestAccessStatus({ program : true })
					log('End of request access, there is nothing we can do anymore.')
				} else {
					log('No port detetect. Likely no access.')
					log('End of request access, there is nothing we can do anymore.')
				}
			} catch (e) {
				log('Error uploading factory program.')
				log('End of request access, there is nothing we can do anymore.')
			}
			break
		default:
			break
	}
	logClose()
}

export async function getRequestAccessStatus() {
	const bootloader = browserStorage.get('web-serial', 'bootloader-detected') || false
	const program = browserStorage.get('web-serial', 'program-detected') || false
	const transientBootloader = browserStorage.get('web-serial', 'transient-bootloader-detected') || false
	return [bootloader, program, transientBootloader]
}

export async function resetAccess() {
	await setRequestAccessStatus({ bootloader : false, program : false })
}

export async function requestAccess(bootloaderHex, programHex) {
	logOpen('Requesting web serial access')
	try {
		log('Checking if both permissions have already been granted.')
		// Check if permission settings have been saved already
		const [bootloader, program] = await getRequestAccessStatus()
		if (bootloader && program) {
			log('Both permissions have already been granted.')
			// Success!
			logClose()
			return
		}

		if (!bootloader && !program) {
			// If we don't have anything allowed yet...
			log('No access to neither bootloader or program.')
			log('Requesting access to both...')
			await refreshPorts({ bootloader : true, program : true })

			log('Checking if any port is detectable...')
			const port = await detectPort({ bootloader : true, program : true })

			if (port) {
				log('A port was detected. Creating a temporary link with it...')
				const tempLink = await createLinkFromPort(port)
				await handleTemporaryLinkRequestAccess(tempLink, bootloaderHex, programHex)
			}
		}	else if (bootloader && !program) {
			// Booloader is allowed but program isn't
			log('Access to booloader, but not to program.')
			log('Requesting access to any...')
			await refreshPorts({ program : true, bootloader : true })

			log('Checking if a program port is detectable...')
			const programPort = await detectPort({ program : true })
			if (programPort) {
				log('A program port was detected. Creating a temporary link with it...')
				const tempLink = await createLinkFromPort(programPort)
				await handleTemporaryLinkRequestAccess(tempLink, bootloaderHex, programHex)
			} else {
				log('Program port was not detected.')
				log('Checking if a bootloader port is detectable...')
				const bootloaderPort = await detectPort({ bootloader : true })
				if (bootloaderPort) {
					log('A bootloader port was detected. Creating a temporary link with it...')
					const tempLink = await createLinkFromPort(bootloaderPort)
					await handleTemporaryLinkRequestAccess(tempLink, bootloaderHex, programHex)
				} else {
					log('No bootloader port was detected.')
					log('End of request access, there is nothing we can do anymore.')
				}
			}
		} else	if (program && !bootloader) {
			// Program is allowed but bootloader isn't
			log('Access to program, but not to bootloader.')
			log('Requesting access to any...')
			await refreshPorts({ program : true, bootloader : true })

			log('Checking if a program port is detectable...')
			const bootloaderPort = await detectPort({ bootloader : true })
			if (bootloaderPort) {
				log('A bootloader port was detected. Creating a temporary link with it...')
				const tempLink = await createLinkFromPort(bootloaderPort)
				await handleTemporaryLinkRequestAccess(tempLink, bootloaderHex, programHex)
			} else {
				log('Bootloader port was not detected.')
				log('Checking if a program port is detectable...')
				const programPort = await detectPort({ program : true })
				if (programPort) {
					log('A program port was detected. Creating a temporary link with it...')
					const tempLink = await createLinkFromPort(programPort)
					await handleTemporaryLinkRequestAccess(tempLink, bootloaderHex, programHex)
				} else {
					log('No program port was detected.')
					log('End of request access, there is nothing we can do anymore.')
				}
			}
		}
	} catch (e) {
	}
	logClose()
}
