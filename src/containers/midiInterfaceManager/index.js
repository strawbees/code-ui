import React from 'react'
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
			midiInit
		} = this.props
		if (process.browser) {
			midiInit()
			if (process.env.NODE_ENV !== 'production') {
				// enableLogs()
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


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(MidiInterfaceManager)
