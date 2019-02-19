import React from 'react'
import PropTypes from 'prop-types'
import nodeFecth from 'node-fetch'
import Router from 'next/router'
import getConfig from 'next/config'
import { connect } from 'react-redux'
import parseUrlVars from 'src/utils/parseUrlVars'
import * as browserStorage from 'src/utils/browserStorage'
import Spinner from 'src/components/spinner'
import GlobalStylesContainer from 'src/containers/globalStylesContainer'
import HeadContainer from 'src/containers/headContainer'
import HeaderContainer from 'src/containers/headerContainer'
import FooterContainer from 'src/containers/footerContainer'
import PageContainer from 'src/containers/pageContainer'
import PageError from 'src/components/pageError'
import ModalContainer from 'src/containers/modalContainer'
// import MidiInterfaceManager from 'src/containers/midiInterfaceManager'
import SerialInterfaceManager from 'src/containers/serialInterfaceManager'
import NavigationManager from 'src/containers/navigationManager'
import StorageManager from 'src/containers/storageManager'
import TrackingManager from 'src/containers/trackingManager'
import getOS from 'src/utils/getOS'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const {
	publicRuntimeConfig : {
		NEXT_SERVER_PORT,
		ROOT_PATH,
		routes,
	}
} = getConfig()

class AppContainer extends React.Component {
	static async getInitialProps({
		query,
		asPath,
		isServer,
		store,
	}) {
		const {
			stringsLoaded,
			setSetup,
			setupEditor,
		} = mergeProps(
			mapStateToProps()(store.getState(), {}),
			mapDispatchToProps(store.dispatch)
		)

		// if re we running from the server...
		if (isServer) {
			const serverStatic = `http://127.0.0.1:${NEXT_SERVER_PORT}${ROOT_PATH}/static`
			setSetup({
				query,
				routes,
				rootPath : ROOT_PATH,
				locales  : (await (await nodeFecth(`${serverStatic}/i18n/index.json`)).json()),
				strings  : {
					locale : query.locale,
					data   : await (await nodeFecth(`${serverStatic}/i18n/${query.locale}.json`)).json(),
				},
				// show the initial page loader
				displayPageLoader : true
			})
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
			<div className="root app">
				<style jsx>{`
					.root {
						position: fixed;
						height: 100%;
						width: 100vw;
						overflow: hidden;
					}
					.root {
						display: flex;
						flex-direction: column;
					}
					.root :global(> .header) {
						position: relative;
						z-index: 2;
						height: 3rem;
					}
					.root :global(> .page) {
						position: relative;
						z-index: 1;
						height: calc(100% - 5rem);
						overflow-y: auto;
					}
					.root :global(> .footer) {
						position: relative;
						z-index: 2;
						height: 2rem;
					}
					/* Page loader */
					.page-loader {
						position: fixed;
						width: 100%;
						height: 100%;
						background-color: rgba(255,255,255,0.6);
						z-index: 999;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
				`}</style>
				<GlobalStylesContainer />
				<StorageManager />
				<NavigationManager />
				{/* <MidiInterfaceManager /> */}
				<SerialInterfaceManager />
				<TrackingManager />
				<HeadContainer />
				<HeaderContainer />
				{displayError ?
					<PageError statusCode={displayError} />
					:
					<PageContainer />
				}
				<FooterContainer />
				<ModalContainer />
				{displayPageLoader &&
					<div className='page-loader'>
						<Spinner scale={4}/>
					</div>
				}
			</div>
		)
	}
}

AppContainer.propTypes = {
	setSetup             : PropTypes.func,
	setStrings           : PropTypes.func,
	setDisplayPageLoader : PropTypes.func,
	setupEditor          : PropTypes.func,
	displayPageLoader    : PropTypes.bool,
	displayError         : PropTypes.PropTypes.oneOf([false, 404, 500]),
	setOS                : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(AppContainer)
