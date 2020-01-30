import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import Package from 'root/package.json'
import shallowCompareObjects from 'src/utils/shallowCompareObjects'
import {
	addGlobalEventListener,
	removeAllGlobalEventListeners,
} from 'src/utils/globalEvents'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const {
	publicRuntimeConfig : {
		CONFIG,
	}
} = getConfig()


class TrackingManager extends React.Component {
	queue = []

	componentDidMount() {
		const { gaId } = this.props
		ReactGA.initialize(gaId, {
			// debug     : true,
			gaOptions : {
				anonymiseIp  : true,
				sendPageView : false
			}
		})
		ReactGA.set({
			// // this will allow us to separate the traffic from the app / web
			appName           : 'CODE',
			appId             : CONFIG,
			appVersion        : Package.version,
			// allow analytics to work in on any protocol (needed for the app,
			// that is served from chrome-extension://...)
			checkProtocolTask : () => {},
		})

		removeAllGlobalEventListeners('track-event') // removing all here just for HRM
		addGlobalEventListener('track-event', this.trackEvent)
		removeAllGlobalEventListeners('track-pageview') // removing all here just for HRM
		addGlobalEventListener('track-pageview', this.trackPageview)
	}

	trackEvent = (data) => {
		this.queue.push({
			type : 'event',
			data
		})
		if (!this.props.paused) {
			this.processQueue()
		}
	}

	trackPageview = (data) => {
		if (data === '/index.html') {
			data = '/'
		}
		this.queue.push({
			type : 'pageview',
			data
		})
		if (!this.props.paused) {
			this.processQueue()
		}
	}

	processQueue = () => {
		while (this.queue.length) {
			const { type, data } = this.queue.shift()
			ReactGA[type](data)
		}
	}

	componentWillUnmout() {
		removeAllGlobalEventListeners('track-event')
		removeAllGlobalEventListeners('track-pageview')
	}

	componentDidUpdate(prevProps) {
		if (!shallowCompareObjects(this.props, prevProps, ['asPath'])) {
			this.trackPageview(this.props.asPath)
		}
		if (!shallowCompareObjects(this.props, prevProps, ['paused']) && !this.props.paused) {
			this.processQueue()
		}
	}

	render() {
		return null
	}
}

TrackingManager.propTypes = {
	asPath : PropTypes.string,
	gaId   : PropTypes.string,
	paused : PropTypes.bool,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(TrackingManager)
