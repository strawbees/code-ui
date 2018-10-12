import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
		const {
			extensionId,
			generateMethod,
			setQbserialAvailable,
		} = this.props
		// connect to the extension
		if (window.quirkbotChromeApp) {
			this.ping = window.quirkbotChromeApp.ping
			this.getModel = window.quirkbotChromeApp.getModel
			setQbserialAvailable(true)
		} else if (typeof window.chrome !== 'undefined') {
			this.ping = generateMethod('ping', extensionId)
			this.getModel = generateMethod('getModel', extensionId)
			setQbserialAvailable(true)
		}
		// start monitoring the extension
		this.connectionTimer = window.setInterval(this.monitorExtensionConnection, 1000)
		this.modelTimer = window.setInterval(this.onTick, 1000)
	}

	monitorExtensionConnection = async () => {
		const {
			extensionId,
			available,
			ready,
			setQbserialReady
		} = this.props

		if (!available) {
			return
		}
		const timeoutPing = () => new Promise(async (resolve, reject) => {
			const timeout = setTimeout(() => {
				reject(new Error('Timeout'))
			}, 500)
			try {
				await this.ping()
				clearTimeout(timeout)
				resolve()
			} catch (error) {
				clearTimeout(timeout)
				reject(error)
			}
		})
		try {
			await timeoutPing()
			if (!ready) {
				console.log(`Connected to extensionId: ${extensionId}`)
				setQbserialReady(true)
			}
		} catch (error) {
			if (ready) {
				console.log(`Disconnected to extensionId: ${extensionId}`)
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
	setQbserialReady     : PropTypes.func,
	extensionId          : PropTypes.string,
	available            : PropTypes.bool,
	ready                : PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SerialInterfaceManager)
