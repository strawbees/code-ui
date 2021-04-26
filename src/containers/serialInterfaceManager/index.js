import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as QuirkbotWebSerial from 'src/serial'
import QuirkbotChromeApp from '@strawbees/quirkbot-chrome-app'
import getConfig from 'next/config'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const {
	publicRuntimeConfig : {
		PREFER_WEB_SERIAL
	}
} = getConfig()

class SerialInterfaceManager extends React.Component {
	constructor(props) {
		super(props)
		this.ping = React.createRef()
		this.getModel = React.createRef()
	}

	onTick = async () => {
		const { ready } = this.props
		if (!ready) {
			return
		}
		const model = await this.getModel.current()

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
		this.connectionTimer = window.setInterval(this.monitorSerialInterface, 1000)
		this.modelTimer = window.setInterval(this.onTick, 1000)

		// If we are using QuirkbotWebSerial, make it avaiable right away
		if (PREFER_WEB_SERIAL && 'serial' in navigator) {
			const {	setQbserialAvailable } = this.props
			QuirkbotWebSerial.enableLogs()
			QuirkbotWebSerial.init()
			this.getModel.current = QuirkbotWebSerial.getModel
			setQbserialAvailable(true)
			// Make the whole API avaiable on the console
			window.QuirkbotWebSerial = { ...QuirkbotWebSerial }
		}
	}

	monitorSerialInterface = async () => {
		const {
			extensionId,
			available,
			allowed,
			allowedStatus,
			ready,
			setQbserialAvailable,
			setQbserialAllowed,
			setQbserialAllowedStatus,
			setQbserialReady,
			generateMethod,
		} = this.props

		// Determine first if we will use the QuirkbotWebSerial or the QuirbotChromeApp...

		if (PREFER_WEB_SERIAL && 'serial' in navigator) {
			// Using QuirkbotWebSerial!

			// The avaiablity will be handle on componentDidMount/componentWillUnmountMount

			// Constatly monitor the access status
			const currentAllowedStatus = await QuirkbotWebSerial.getRequestAccessStatus()
			if (currentAllowedStatus[0] !== allowedStatus[0] || currentAllowedStatus[1] !== allowedStatus[1]) {
				setQbserialAllowedStatus(currentAllowedStatus)
			}
			if (currentAllowedStatus.every(status => status === true)) {
				if (!allowed) setQbserialAllowed(true)
				if (!ready) setQbserialReady(true)
			} else {
				if (allowed) setQbserialAllowed(false)
				if (ready) setQbserialReady(false)
			}
		} else if (!available) {
			// Using QuirbotChromeApp!

			// Determine if we are using the built-in app (desktop client), or the browser version...
			if (QuirkbotChromeApp.init) {
				// Using built-in app!
				QuirkbotChromeApp.init()
				this.ping.current = QuirkbotChromeApp.ping
				this.getModel.current = QuirkbotChromeApp.getModel
				setQbserialAvailable(true)
				setQbserialAllowedStatus([true, true])
				setQbserialAllowed(true)
			} else if (typeof window.chrome !== 'undefined') {
				// Using browser version!
				this.inited = true
				this.ping.current = generateMethod('ping', extensionId)
				this.getModel.current = generateMethod('getModel', extensionId)
				setQbserialAvailable(true)
				setQbserialAllowedStatus([true, true])
				setQbserialAllowed(true)
			}

			// Create a "ping" that will monitor if the QuirbotChromeApp is avaible
			const timeoutPing = () => new Promise((resolve, reject) => {
				const timeout = setTimeout(() => {
					reject(new Error('Timeout'))
				}, 500)
				this.ping.current().then(() => {
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
	}

	componentWillUnmount() {
		clearInterval(this.connectionTimer)
		clearInterval(this.modelTimer)
		this.ping.current = null
		this.getModel.current = null
		// If we are using QuirkbotWebSerial, detroy it
		if (PREFER_WEB_SERIAL && 'serial' in navigator) {
			const {	setQbserialAvailable } = this.props
			QuirkbotWebSerial.destroy()
			setQbserialAvailable(false)
			// Disabled the console API
			window.QuirkbotWebSerial = null
		}
	}

	render() {
		return (null)
	}
}

SerialInterfaceManager.propTypes = {
	setQbserialLinks         : PropTypes.func,
	setQbserialAvailable     : PropTypes.func,
	setQbserialAllowed       : PropTypes.func,
	setQbserialAllowedStatus : PropTypes.func,
	setQbserialReady         : PropTypes.func,
	extensionId              : PropTypes.string,
	available                : PropTypes.bool,
	allowed                  : PropTypes.bool,
	ready                    : PropTypes.bool,
	allowedStatus(props, propName) {
		if (!Array.isArray(props[propName]) || props[propName].length !== 2 || !props[propName].every((v) => typeof v === 'boolean')) {
			return new Error(`${propName} needs to be an array of two booleans.`)
		}
		return null
	},
}

const serialInterfaceManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SerialInterfaceManager)

export default serialInterfaceManagerConnected
