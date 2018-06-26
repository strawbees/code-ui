import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import { connect } from 'react-redux'
import {
	addGlobalEventListener,
	removeGlobalEventListener
} from 'src/utils/globalEvents'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class NavigationManager extends React.Component {
	async componentDidMount() {
		// Monitor Links clicks and popState
		addGlobalEventListener('link', this.onLinkClicked)
		Router.beforePopState(this.onBeforePopState)
	}

	componentWillUnmout() {
		// Stop monitoring Links clicks and popState
		removeGlobalEventListener('link', this.onLinkClicked)
		Router.onBeforePopState(() => true)
	}

	// Forward the beforePopState, with a custom cancel handle
	onBeforePopState = ({ url, as, options }) => {
		// create an async handle, to control the pop state flow
		const asyncHandle = async () => {
			try {
				await this.onBeforeNavigation(as)
				// If onBeforeNavigation resolves, process the link
				Router.replace(url, as, options)
			} catch (e) {}
		}
		asyncHandle()
		// return false, causing the popstate to be cancelled (we don't need
		// it because we are in full control of the flow)
		return false
	}

	// Forward the link cliks, with a custom cancel handle
	onLinkClicked = async ({ as, href, nativeEvent }) => {
		if (nativeEvent.currentTarget.nodeName === 'A' &&
			(
				nativeEvent.metaKey ||
				nativeEvent.ctrlKey ||
				nativeEvent.shiftKey ||
				(
					nativeEvent.nativeEvent &&
					nativeEvent.nativeEvent.which === 2
				)
			)
		) {
			// ignore click for new tab / new window behavior
			return
		}
		// Stop the event, we take control from now on
		nativeEvent.preventDefault()
		try {
			await this.onBeforeNavigation(as)
			// If onBeforeNavigation resolves, process the link
			Router.push(href, as)
		} catch (e) {}
	}

	// Unified call that will run before the page changes
	onBeforeNavigation = async (as) => {
		const {
			queryRef
		} = this.props

		// we only care about monitoring changes *from* the editor
		if (queryRef !== 'flow' ||
			queryRef !== 'block' ||
			queryRef !== 'text') {
			return
		}

	}

	render() {
		return null
	}
}

NavigationManager.propTypes = {
	queryRef : PropTypes.string,
	urlVars  : PropTypes.object,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NavigationManager)
