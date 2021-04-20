import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as QuirkbotWebSerial from 'src/serial'
import QuirkbotChromeApp from '@strawbees/quirkbot-chrome-app'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class SerialInterfaceManager extends React.Component {
	onTick = async () => {
		const { ready } = this.props
		if (!ready) {
			return
		}
		const model = await this.getModel()

		const {
			setQbserialLinks,
		} = this.props

		const links = model.quirkbots.reduce((acc, link) => {
			acc[link.runtimeId] = {
				hardwareInterface      : 'serial',
				runtimeId              : link.runtimeId,
				uuid                   : link.uuid,
				bootloader             : link.bootloader,
				midi                   : false,
				serial                 : true,
				uploading              : link.upload && link.upload.pending,
				enteringBootloaderMode : false,
				exitingBootloaderMode  : false,
			}
			return acc
		}, {})
		if (JSON.stringify(this.links) !== JSON.stringify(links)) {
			this.links = links
			setQbserialLinks(links)
		}
	}

	componentDidMount() {
		// start monitoring the extension
		this.connectionTimer = window.setInterval(this.monitorExtensionConnection, 1000)
		this.modelTimer = window.setInterval(this.onTick, 1000)
	}

	monitorExtensionConnection = async () => {
		const {
			extensionId,
			available,
			allowed,
			ready,
			setQbserialAvailable,
			setQbserialAllowed,
			setQbserialReady,
			generateMethod,
		} = this.props

		// Determine if we are using the webserial or Chrome App Version
		if ('serial' in navigator) {
			// The Web Serial API is supported.
			if (!available) {
				await QuirkbotWebSerial.init()
				setQbserialAvailable(true)
				if (!allowed) {

				}
			}
			return
		}
		// Using Chrome app...

		if (!available) {
			// connect to the extension
			if (QuirkbotChromeApp.init) {
				/* eslint-disable no-console */
				console.log('Using in memory quirkbotChromeApp')
				/* eslint-enable no-console */
				QuirkbotChromeApp.init()
				this.ping = QuirkbotChromeApp.ping
				this.getModel = QuirkbotChromeApp.getModel
				setQbserialAvailable(true)
				setQbserialAllowed(true)
			} else if (typeof window.chrome !== 'undefined') {
				this.inited = true
				this.ping = generateMethod('ping', extensionId)
				this.getModel = generateMethod('getModel', extensionId)
				setQbserialAvailable(true)
				setQbserialAllowed(true)
			}
			return
		}

		const timeoutPing = () => new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject(new Error('Timeout'))
			}, 500)
			this.ping().then(() => {
				clearTimeout(timeout)
				resolve()
			}).catch((error) => {
				clearTimeout(timeout)
				reject(error)
			})
		})
		try {
			await timeoutPing()
			if (!ready) {
				/* eslint-disable no-console */
				console.log(`Connected to extensionId: ${extensionId}`)
				/* eslint-enable no-console */
				setQbserialReady(true)
			}
		} catch (error) {
			if (ready) {
				/* eslint-disable no-console */
				console.log(`Disconnected to extensionId: ${extensionId}`)
				/* eslint-enable no-console */
				setQbserialReady(false)
			}
		}
	}

	componentWillUnmount() {
		clearInterval(this.connectionTimer)
		clearInterval(this.modelTimer)
	}

	render() {
		return (null)
	}
}

SerialInterfaceManager.propTypes = {
	setQbserialLinks     : PropTypes.func,
	setQbserialAvailable : PropTypes.func,
	setQbserialAllowed   : PropTypes.func,
	setQbserialReady     : PropTypes.func,
	extensionId          : PropTypes.string,
	available            : PropTypes.bool,
	allowed              : PropTypes.bool,
	ready                : PropTypes.bool,
}

const serialInterfaceManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SerialInterfaceManager)

export default serialInterfaceManagerConnected
