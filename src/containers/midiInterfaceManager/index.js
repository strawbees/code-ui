import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class MidiInterfaceManager extends React.Component {
	onTick() {
		const {
			setQbmidiLinks,
			midiGetLinks
		} = this.props

		const links = midiGetLinks().reduce((acc, link) => {
			acc[link.runtimeId] = {
				hardwareInterface      : 'midi',
				runtimeId              : link.runtimeId,
				uuid                   : link.uuid,
				bootloader             : link.bootloader,
				midi                   : link.midi,
				serial                 : true,
				updated                : link.updated,
				uploading              : link.uploading,
				enteringBootloaderMode : link.enteringBootloaderMode,
				exitingBootloaderMode  : link.exitingBootloaderMode
			}
			return acc
		}, {})
		if (JSON.stringify(this.links) !== JSON.stringify(links)) {
			this.links = links
			setQbmidiLinks(links)
		}
	}

	async componentDidMount() {
		const {
			midiInit,
			setQbmidiAvailable,
			setQbmidiReady,
			midiEnableLogs,
			midiDisableLogs,
		} = this.props
		if (process.browser && navigator && navigator.requestMIDIAccess) {
			setQbmidiAvailable(true)
			try {
				await midiInit()
				setQbmidiReady(true)
				window.midiEnableLogs = midiEnableLogs
				window.midiDisableLogs = midiDisableLogs
				this.timer = window.setInterval(() => this.onTick(), 1000)
			} catch (e) {
				console.log('Cannot intialize midi')
			}
		}
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		return (null)
	}
}

MidiInterfaceManager.propTypes = {
	setQbmidiLinks     : PropTypes.func,
	setQbmidiAvailable : PropTypes.func,
	setQbmidiReady     : PropTypes.func,
	midiInit           : PropTypes.func,
	midiGetLinks       : PropTypes.func,
	midiEnableLogs     : PropTypes.func,
	available          : PropTypes.bool,
	ready              : PropTypes.bool,
}

const midiInterfaceManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(MidiInterfaceManager)

export default midiInterfaceManagerConnected
