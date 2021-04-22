import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as QuirkbotWebSerial from 'src/serial'
import QuirkbotChromeApp from '@strawbees/quirkbot-chrome-app'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

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
		this.connectionTimer = window.setInterval(this.monitorExtensionConnection, 1000)
		this.modelTimer = window.setInterval(this.onTick, 1000)
	}

	monitorExtensionConnection = async () => {
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

		// Determine if we are using the webserial or Chrome App Version
		if ('serial' in navigator) {
			// The Web Serial API is supported.
			if (!available) {
				await QuirkbotWebSerial.init()
				// this.ping.current = QuirkbotWebSerial.ping // no need for ping on web serial
				this.getModel.current = QuirkbotWebSerial.getModel
				setQbserialAvailable(true)
			}

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
				this.ping.current = QuirkbotChromeApp.ping
				this.getModel.current = QuirkbotChromeApp.getModel
				setQbserialAvailable(true)
				setQbserialAllowedStatus([true, true])
				setQbserialAllowed(true)
			} else if (typeof window.chrome !== 'undefined') {
				this.inited = true
				this.ping.current = generateMethod('ping', extensionId)
				this.getModel.current = generateMethod('getModel', extensionId)
				setQbserialAvailable(true)
				setQbserialAllowedStatus([true, true])
				setQbserialAllowed(true)
			}
			return
		}

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

	componentWillUnmount() {
		clearInterval(this.connectionTimer)
		clearInterval(this.modelTimer)
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
