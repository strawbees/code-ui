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
				runtimeId              : link.runtimeId,
				uuid                   : link.uuid,
				bootloader             : link.bootloader,
				midi                   : link.midi,
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
	componentDidMount() {
		const {
			midiInit,
			// midiEnableLogs
		} = this.props
		if (process.browser) {
			midiInit()
			if (process.env.NODE_ENV !== 'production') {
				// midiEnableLogs()
			}
			this.timer = window.setInterval(() => this.onTick(), 1000)
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
	setQbmidiLinks : PropTypes.func,
	midiInit       : PropTypes.func,
	midiGetLinks   : PropTypes.func,
	midiEnableLogs : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(MidiInterfaceManager)
