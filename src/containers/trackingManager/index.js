import React from 'react'
import ReactGA from 'react-ga'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import shallowCompareObjects from 'src/utils/shallowCompareObjects'
import getConfig from 'next/config'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const {
	publicRuntimeConfig : {
		GAID
	}
} = getConfig()


class TrackingManager extends React.Component {
	componentDidMount() {
		ReactGA.initialize(GAID, {
			debug     : true,
			gaOptions : {
				anonymise_ip   : true,
				send_page_view : false
			}
		})
	}

	componentDidUpdate(prevProps) {
		if (!shallowCompareObjects(this.props, prevProps, ['asPath'])) {
			ReactGA.pageview(this.props.asPath)
		}
	}

	render() {
		return null
	}
}

TrackingManager.propTypes = {
	asPath : PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(TrackingManager)
