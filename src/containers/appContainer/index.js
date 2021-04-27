import React from 'react'
import PropTypes from 'prop-types'
import nodeFetch from 'node-fetch'
import factoryCode from 'data/firmware/factory'
import codingCards from 'data/codingCards.json'
import Router from 'next/router'
import getConfig from 'next/config'
import { connect } from 'react-redux'
import parseUrlVars from 'src/utils/parseUrlVars'
import * as browserStorage from 'src/utils/browserStorage'
import App from 'src/components/app'
import getOS from 'src/utils/getOS'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const {
	publicRuntimeConfig : {
		NEXT_SERVER_PORT,
		ROOT_PATH,
		COMPILER_URL,
	}
} = getConfig()

class AppContainer extends React.Component {
	static async getInitialProps({
		query,
		asPath,
		store,
	}) {
		const isServer = typeof window === 'undefined'

		const {
			stringsLoaded,
			setSetup,
			setupEditor,
			setCompilerBootloaderUpdaterHex,
		} = mergeProps(
			mapStateToProps()(store.getState(), {}),
			mapDispatchToProps(store.dispatch)
		)

		// if re we running from the server...
		if (isServer) {
			const serverStatic = `http://127.0.0.1:${NEXT_SERVER_PORT}${ROOT_PATH}/static`
			setSetup({
				query,
				factoryCode,
				codingCards,
				rootPath : ROOT_PATH,
				routes   : (await (await nodeFetch(`${serverStatic}/routes.json`)).json()),
				locales  : (await (await nodeFetch(`${serverStatic}/i18n/index.json`)).json()),
				strings  : {
					locale : query.locale,
					data   : await (await nodeFetch(`${serverStatic}/i18n/${query.locale}.json`)).json(),
				},
				// show the initial page loader
				displayPageLoader : true
			})
			// preload the bootloader updater
			setCompilerBootloaderUpdaterHex(await (await nodeFetch(`${COMPILER_URL}/cfirmware-booloader-updater`)).json())
			// Editor setup only needs to happen once, in server
			setupEditor()
			return
		}
		// if re we running from the client...
		const clientStatic = `${ROOT_PATH}/static`
		setSetup({
			query,
			asPath,
			urlVars : parseUrlVars(asPath),
			// load the strings if needed
			...(!stringsLoaded[query.locale] ? {
				strings : {
					locale : query.locale,
					data   : await (await fetch(`${clientStatic}/i18n/${query.locale}.json`)).json()
				}
			} : {})
		})
	}

	async componentDidMount() {
		const {
			setSetup,
			setHiddenGlobalBanners,
		} = this.props

		setSetup({
			// adjust as path and url on first render
			asPath            : Router.router.asPath,
			urlVars           : parseUrlVars(Router.router.asPath),
			// set the sniffed os
			os                : getOS(),
			// hide the initial page loader
			displayPageLoader : false
		})
		// hide the global banners
		setHiddenGlobalBanners(browserStorage.getKeys('hiddenGlobalBanners'))
	}

	render() {
		const {
			displayPageLoader,
			displayError,
		} = this.props

		return (
			<App
				displayPageLoader={displayPageLoader}
				displayError={displayError}
			/>
		)
	}
}

AppContainer.propTypes = {
	setSetup                        : PropTypes.func,
	setStrings                      : PropTypes.func,
	setDisplayPageLoader            : PropTypes.func,
	setupEditor                     : PropTypes.func,
	setCompilerBootloaderUpdaterHex : PropTypes.func,
	displayPageLoader               : PropTypes.bool,
	displayError                    : PropTypes.PropTypes.oneOf([false, 404, 500]),
	setOS                           : PropTypes.func,
}

const appContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(AppContainer)

export default appContainerConnected
