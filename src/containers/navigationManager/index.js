import React from 'react'
import PropTypes from 'prop-types'
import LZString from 'lz-string'
import Router from 'next/router'
import {
	isProgramIdValid,
	loadProgram,
	isUserIdValid,
	loadUserPublicProfile,
} from 'src/storage'
import { connect } from 'react-redux'
import {
	addGlobalEventListener,
	removeGlobalEventListener,
	removeAllGlobalEventListeners,
} from 'src/utils/globalEvents'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import shallowCompareObjects from 'src/utils/shallowCompareObjects'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class NavigationManager extends React.PureComponent {
	async componentDidMount() {
		// Monitor Links clicks and popState
		// (explicitly removing all listeners before attaching a new one, to
		// make sure we clean any eventual listener that was created by
		// hot reloading (HRM))
		removeAllGlobalEventListeners('link')
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

	// process the naviation on prop changes
	componentDidUpdate(prevProps) {
		this.processNavigation(prevProps)
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
	onLinkClicked = async ({
		as,
		href,
		nativeEvent,
		inApp,
	}) => {
		if (!inApp) {
			// ignore links that are not from inside the app
			return
		}
		if (nativeEvent && nativeEvent.currentTarget && nativeEvent.currentTarget.nodeName === 'A' &&
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
		if (nativeEvent && nativeEvent.preventDefault) {
			nativeEvent.preventDefault()
		}
		try {
			await this.onBeforeNavigation(as)
			// If onBeforeNavigation resolves, process the link
			Router.push(href, as)
		} catch (e) {}
	}

	// Unified call that will run before the page changes
	onBeforeNavigation = async (as) => {
		const {
			queryRef,
			queryLocale,
			asPath,
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

		// check if this is not just a language change, by parsing the
		// navigation and chekcing if the queryRef is the same, if so, no need to
		// show the dialog either
		const resolved = resolveLinkUrl(as)
		if (resolved.href.query &&
			resolved.href.query.ref === queryRef &&
			resolved.href.query.locale !== queryLocale) {
			return
		}

		// If we got here it means the user is about to leave the editor with
		// unsaved progress, so we show a dialog asking if they want cancel the
		// naviation or to proceed
		await safeOpenDialogModal(
			{
				titleKey        : 'ui.dialog.discard.title',
				descriptionKey  : 'ui.dialog.discard.description',
				confirmLabelKey : 'ui.dialog.discard.confirm',
				limitWidth      : true,
			}
		)
		// Now we are in a very special case... that requires a bit of hack to
		// get around...
		// In case the user is currently editing a program that has not been
		// saved yet, and then tries to create a new program (of the same type),
		// we will show the dialog above; if they agree to it, we will get here
		// to this line - and usually that's it, the processNavigation() will
		// be called in consequence of the route (and props) change. But that
		// won't work now, because there won't be any route change, so
		// processNavigation() never get's called.
		// To work around that, if we will call processNavigation() manually
		// with some bogus queryRef, so that it will think there is a change
		// and reset the editor. Let's how far this hack goes...
		if (resolved.href.query &&
			resolved.href.query.ref === queryRef &&
			resolved.href.query.locale === queryLocale &&
			asPath === as) {
			this.processNavigation({
				...this.props,
				queryRef : 'hack',
			})
		}
	}

	// Monitor the page and url var changes to load programs, users, etc
	processNavigation = async (prevProps) => {
		// Only proceef if there are changes to the props that we care about
		if (shallowCompareObjects(
			this.props,
			prevProps,
			['queryRef', 'urlVarP', 'urlVarU', 'urlVarData'])) {
			return
		}
		// Actions used
		const {
			resetCurrentEditorProgram,
			setCurrentEditorProgram,
			setDisplayPageLoader,
			setDisplayError,
			setPublicProfile,
		} = this.props

		// Props that we care about
		const { queryRef } = this.props

		// Start by always cleaning the error
		setDisplayError(false)

		// Check if this is a user page
		if (queryRef === 'user') {
			const { urlVarU } = this.props
			// Show the loader
			setDisplayPageLoader(true)

			// Reset the current public profile
			setPublicProfile(null)

			// If there's no user id, there's nothing to show
			if (queryRef && !urlVarU) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}

			// If theres a user id...
			// Check if it is valid...
			if (!isUserIdValid(urlVarU)) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}
			// Try to load it
			let profile
			try {
				profile = await loadUserPublicProfile(urlVarU)
			} catch (e) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}
			if (profile) {
				setPublicProfile(profile)
				setDisplayPageLoader(false)
				return
			}
			// If we got here, I am not sure what to do :)
			setDisplayError(404)
			setDisplayPageLoader(false)
			return
		}

		// Only act on the editor pages
		if (queryRef !== 'flow' &&
			queryRef !== 'block' &&
			queryRef !== 'text') {
			return
		}

		const { urlVarP } = this.props
		let { urlVarData } = this.props

		// if there's both ?data and ?p, ignore ?data
		if (urlVarP && urlVarData) {
			urlVarData = null
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
				source : json.source,
			}
			setCurrentEditorProgram(program)
			setDisplayPageLoader(false)
			return
		}

		// If theres a program id...
		if (urlVarP) {
			// Check if it is valid...
			if (!isProgramIdValid(urlVarP)) {
				setDisplayError(404)
				setDisplayPageLoader(false)
				return
			}
			// Try to load it
			let program
			try {
				program = await loadProgram(urlVarP)
			} catch (e) {
				setDisplayError(404)
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
	queryLocale         : PropTypes.string,
	asPath              : PropTypes.string,
	urlVarP             : PropTypes.string,
	urlVarU             : PropTypes.string,
	urlVarData          : PropTypes.string,
	refEditorHasChanges : PropTypes.bool,

	resetCurrentEditorProgram : PropTypes.func,
	setCurrentEditorProgram   : PropTypes.func,
	setDisplayPageLoader      : PropTypes.func,
	setDisplayError           : PropTypes.func,
	setPublicProfile          : PropTypes.func,
}

const navigationManagerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NavigationManager)

export default navigationManagerConnected
