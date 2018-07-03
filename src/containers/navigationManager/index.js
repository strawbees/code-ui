import React from 'react'
import PropTypes from 'prop-types'
import LZString from 'lz-string'
import Router from 'next/router'
import {
	isIdValid,
	loadProgram,
} from 'src/storage'
import { connect } from 'react-redux'
import {
	addGlobalEventListener,
	removeGlobalEventListener,
	removeAllGlobalEventListeners,
} from 'src/utils/globalEvents'
import shallowCompareObjects from 'src/utils/shallowCompareObjects'
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
		this.processNavigation({})
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
	onBeforeNavigation = async () => {
		const {
			queryRef,
			urlVarP,
			urlVarData,
			refEditorHasChanges,
			safeOpenDialogModal,
		} = this.props

		// we only care about monitoring changes *from* the editor
		if (queryRef !== 'flow' &&
			queryRef !== 'block' &&
			queryRef !== 'text') {
			return
		}

		// if the program has no changes, or if it is currently loaded by a program
		// id or program data, we don't need to care about it
		if (!refEditorHasChanges || urlVarP || urlVarData) {
			return
		}

		// If we got here it means the user is about to leave the editor with
		// unsaved progress, so we show a dialog asking if they want cancel the
		// naviation or to proceed
		await safeOpenDialogModal(
			{
				titleKey        : 'ui.dialog.discart.title',
				descriptionKey  : 'ui.dialog.discart.description',
				confirmLabelKey : 'ui.dialog.discart.confirm',
			}
		)
	}

	// process the naviation on prop changes
	componentDidUpdate(prevProps) {
		this.processNavigation(prevProps)
	}

	// Monitor the page and url var changes to load programs
	processNavigation = async (prevProps) => {
		// Only proceef if there are changes to the props that we care about
		if (shallowCompareObjects(
			this.props,
			prevProps,
			['queryRef', 'urlVarP', 'urlVarData'])) {
			return
		}
		// Actions used
		const {
			resetCurrentEditorProgram,
			setCurrentEditorProgram,
			setDisplayPageLoader,
			setDisplayError,
		} = this.props

		// Props that we care about
		const { urlVarP, queryRef } = this.props
		let { urlVarData } = this.props

		// if there's both ?data and ?p, ignore ?data
		if (urlVarP && urlVarData) {
			urlVarData = null
		}

		// Start by always cleaning the error
		setDisplayError(null)

		// Only act on the editor pages
		if (queryRef !== 'flow' &&
			queryRef !== 'block' &&
			queryRef !== 'text') {
			return
		}

		// Show the loader
		setDisplayPageLoader(true)

		// Reset editor, since there's no program to show
		if (queryRef && !urlVarP && !urlVarData) {
			resetCurrentEditorProgram()
			setDisplayPageLoader(false)
			return
		}

		// If theres data, parse it and try to load it into a program
		if (urlVarData) {
			// First try to decompress the string
			const decompressed = LZString.decompressFromEncodedURIComponent(urlVarData)
			if (!decompressed) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}
			// Then try to parse it to json
			let json
			try {
				json = JSON.parse(decompressed)
			} catch (e) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}
			// Check if the json is valid
			if (json.type !== queryRef) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}

			// Finaly load the program
			const program = {
				name   : json.name,
				source : json.source
			}
			setCurrentEditorProgram(program)
			setDisplayPageLoader(false)
			return
		}

		// If theres a program id...
		if (urlVarP) {
			// Check if it is valid...
			if (!isIdValid(urlVarP)) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}
			// Try to load it
			let program
			try {
				program = await loadProgram(urlVarP)
			} catch (e) {
				setDisplayError(e)
				setDisplayPageLoader(false)
				return
			}
			if (program) {
				setCurrentEditorProgram(program)
				setDisplayPageLoader(false)
				return
			}
		}

		// If we got here, I am not sure what to do :)
		setDisplayError(404)
		setDisplayPageLoader(false)
	}

	render() {
		return null
	}
}

NavigationManager.propTypes = {
	queryRef            : PropTypes.string,
	urlVarP             : PropTypes.string,
	urlVarData          : PropTypes.string,
	refEditorHasChanges : PropTypes.bool,

	resetCurrentEditorProgram : PropTypes.func,
	setCurrentEditorProgram   : PropTypes.func,
	setDisplayPageLoader      : PropTypes.func,
	setDisplayError           : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NavigationManager)
