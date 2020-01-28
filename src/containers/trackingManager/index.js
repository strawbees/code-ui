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
			// this will allow us to separate the traffic from the app / web
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
		ReactGA.event(data)
	}

	trackPageview = (path) => {
		if (path === '/index.html') {
			path = '/'
		}
		ReactGA.pageview(path)
	}

	componentWillUnmout() {
		removeAllGlobalEventListeners('track-event')
		removeAllGlobalEventListeners('track-pageview')
	}

	componentDidUpdate(prevProps) {
		if (!shallowCompareObjects(this.props, prevProps, ['asPath'])) {
			this.trackPageview(this.props.asPath)
		}
	}

	render() {
		return null
	}
}

TrackingManager.propTypes = {
	asPath : PropTypes.string,
	gaId   : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(TrackingManager)
