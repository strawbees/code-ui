import React from 'react'
import { connect } from 'react-redux'
import * as qbmidiActions from 'src/actions/qbmidi'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'
import {
	init as initMidi,
	getLinks,
	enableLogs
} from 'quirkbot-midi-interface'

class MidiInterfaceContainer extends React.Component {
	onTick() {
		const {
			setQbmidiLinks
		} = this.props

		const links = getLinks().reduce((acc, link) => {
			acc[link.runtimeId] = {
				runtimeId  : link.runtimeId,
				uuid       : link.uuid,
				bootloader : link.bootloader,
				midi       : link.midi,
				updated    : link.updated
			}
			return acc
		}, {})
		if (JSON.stringify(this.links) !== JSON.stringify(links)) {
			this.links = links
			setQbmidiLinks(links)
		}
	}
	componentDidMount() {
		if (process.browser) {
			initMidi()
			if (process.env.NODE_ENV !== 'production') {
				//enableLogs()
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

const mapStateToProps = () => ({})
const mapDispatchToProps = autobindDispatchToProps(qbmidiActions)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MidiInterfaceContainer)
