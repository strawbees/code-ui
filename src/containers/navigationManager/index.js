import React from 'react'
import PropTypes from 'prop-types'
import LZString from 'lz-string'
import Router from 'next/router'
import debounce from 'src/utils/debounce'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import { connect } from 'react-redux'
import {
	addGlobalEventListener,
	removeGlobalEventListener,
	removeAllGlobalEventListeners,
} from 'src/utils/globalEvents'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class NavigationManager extends React.PureComponent {
	async componentDidMount() {
		// Monitor Links clicks and popState
		removeAllGlobalEventListeners('link') // removing all here just for HRM
		addGlobalEventListener('link', this.onLinkClicked)
		Router.beforePopState(this.onBeforePopState)

		// Call manually processNavigation, since componentDidUpdate is not
		// called on first render
		this.processNavigation()
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
		const url = resolveLinkUrl(as)

		// we only care about monitoring changes *from* the editor
		if (queryRef !== 'flow' &&
			queryRef !== 'block' &&
			queryRef !== 'text') {
			return
		}
	}

	// process the naviation on prop changes
	componentDidUpdate() {
		this.processNavigation()
	}

	// Monitor the page and url var changes to load programs
	processNavigation = async () => {
		const {
			resetCurrentEditorProgram,
			setCurrentEditorProgram,
		} = this.props
		const { queryRef, urlVarP } = this.props
		let { urlVarData } = this.props


		// if there's both ?data and ?p, ignore ?data
		if (urlVarP && urlVarData) {
			urlVarData = null
		}

		// Only act on the editor pages
		if (queryRef !== 'flow' &&
			queryRef !== 'block' &&
			queryRef !== 'text') {
			return
		}

		// Reset editor, since there's no program to show
		if (queryRef && !urlVarP && !urlVarData) {
			resetCurrentEditorProgram()
			return
		}

		// If theres data, parse it and try to load it into a program
		if (urlVarData) {
			// First try to decompress the string
			const decompressed = LZString.decompressFromEncodedURIComponent(urlVarData)
			if (!decompressed) {
				// TODO: show error
				return
			}
			// Then try to parse it to json
			let json
			try {
				json = JSON.parse(decompressed)
			} catch (e) {
				// TODO: show error
				return
			}
			// Check if the json is valid
			if (json.type !== queryRef) {
				// TODO: show error
				return
			}

			// Finaly load the program
			const program = {
				name   : json.name,
				source : json.source
			}
			setCurrentEditorProgram(program)
			return
		}

		// If theres data, parse it and try to load it into a program
		if (urlVarP) {

		}
	}

	render() {
		return null
	}
}

NavigationManager.propTypes = {
	queryRef   : PropTypes.string,
	urlVarP    : PropTypes.string,
	urlVarData : PropTypes.string,

	resetCurrentEditorProgram : PropTypes.func,
	setCurrentEditorProgram   : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NavigationManager)
