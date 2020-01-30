import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import shallowCompareObjects from 'src/utils/shallowCompareObjects'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


class CookieNoticeManager extends React.Component {
	componentDidMount() {
		if (this.props.checkIfShouldDisplay()) {
			this.props.setDisplayCookieNotice(true)
		}
	}

	componentDidUpdate(prevProps) {
		if (!shallowCompareObjects(this.props, prevProps, ['displayCookieNotice'])) {
			if (this.props.displayCookieNotice) {
				this.props.openModal()
			}
		}
	}

	render() {
		return null
	}
}

CookieNoticeManager.propTypes = {
	displayCookieNotice    : PropTypes.bool,
	pauseTracking          : PropTypes.bool,
	checkIfShouldDisplay   : PropTypes.func,
	openModal              : PropTypes.func,
	setDisplayCookieNotice : PropTypes.func,
	setPauseTracking       : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CookieNoticeManager)
