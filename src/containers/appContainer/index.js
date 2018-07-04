import React from 'react'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'
import Router from 'next/router'
import { connect } from 'react-redux'
import parseUrlVars from 'src/utils/parseUrlVars'
import loadStaticData from 'src/utils/loadStaticData'
import Spinner from 'src/components/spinner'
import HeadContainer from 'src/containers/headContainer'
import HeaderContainer from 'src/containers/headerContainer'
import FooterContainer from 'src/containers/footerContainer'
import PageContainer from 'src/containers/pageContainer'
import PageError from 'src/components/pageError'
import ModalContainer from 'src/containers/modalContainer'
import MidiInterfaceManager from 'src/containers/midiInterfaceManager'
import NavigationManager from 'src/containers/navigationManager'
import StorageManager from 'src/containers/storageManager'
import { BLACK } from 'src/constants/colors'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class AppContainer extends React.Component {
	static async getInitialProps({
		query,
		asPath,
		isServer,
		store
	}) {
		const {
			routesLoaded,
			localesLoaded,
			stringsLoaded,
			setSetup,
			setRoutes,
			setLocales,
			setStrings,
			setDisplayPageLoader,
			setupEditor,
		} = mergeProps(
			mapStateToProps()(store.getState(), {}),
			mapDispatchToProps(store.dispatch)
		)
		if (!isServer) {
			setSetup({
				query,
				asPath,
				urlVars : parseUrlVars(asPath)
			})
		} else {
			setSetup({
				query,
			})
		}
		if (!routesLoaded) {
			setRoutes(await loadStaticData('routes.json'))
		}
		if (!localesLoaded) {
			setLocales(await loadStaticData('locales/index.json'))
		}
		if (!stringsLoaded[query.locale]) {
			setStrings({
				locale : query.locale,
				data   : await loadStaticData(`locales/${query.locale}.json`)
			})
		}
		if (isServer) {
			// show the initial page loader
			setDisplayPageLoader(true)
			// Editor setup only needs to happen once, in server
			setupEditor()
		}
	}

	async componentDidMount() {
		// hookup nprogress
		Router.router.events.on('routeChangeStart', NProgress.start)
		Router.router.events.on('routeChangeComplete', NProgress.done)
		Router.router.events.on('routeChangeError', NProgress.done)
		// adjust as path on first render
		const {
			setSetup,
			setDisplayPageLoader,
		} = this.props
		setSetup({
			asPath  : Router.router.asPath,
			urlVars : parseUrlVars(Router.router.asPath),
		})

		// hide the initial page loader
		setDisplayPageLoader(false)
	}

	componentWillUnmount() {
		// unhook nprogress
		Router.router.events.off('routeChangeStart', NProgress.start)
		Router.router.events.off('routeChangeComplete', NProgress.done)
		Router.router.events.off('routeChangeError', NProgress.done)
	}

	// shouldComponentUpdate() {
	// 	// Since we don't really pass down any props/state, we just need
	// 	// to render once.
	// 	return false
	// }

	render() {
		const {
			displayPageLoader,
			displayError,
		} = this.props

		return (
			<div className="root app">
				<style jsx>{`
					/* This stylesheet generated by Transfonter (https://transfonter.org) */
					@font-face {
						font-family: 'Text';
						src: url('/static/fonts/BrandonText-Medium.woff2') format('woff2'),
							url('/static/fonts/BrandonText-Medium.woff') format('woff');
						font-weight: 500;
						font-style: normal;
					}
					@font-face {
						font-family: 'Text';
						src: url('/static/fonts/BrandonText-Regular.woff2') format('woff2'),
							url('/static/fonts/BrandonText-Regular.woff') format('woff');
						font-weight: normal;
						font-style: normal;
					}
					@font-face {
						font-family: 'Text';
						src: url('/static/fonts/BrandonText-Bold.woff2') format('woff2'),
							url('/static/fonts/BrandonText-Bold.woff') format('woff');
						font-weight: bold;
						font-style: normal;
					}
					@font-face {
						font-family: 'Code';
						font-style: normal;
						font-weight: 400;
						src: local('Source Code Pro'),
							local('SourceCodePro-Regular'),
							url(/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWnsUnxlC9.woff2) format('woff2')
							url(/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWnsUnxlC9.woff) format('woff');
						unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
					}
					@font-face {
						font-family: 'Code';
						font-style: normal;
						font-weight: 400;
						src: local('Source Code Pro'),
							local('SourceCodePro-Regular'),
							url(/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff2) format('woff2'),
							url(/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff) format('woff');
						unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
					}
					:global(html),
					:global(body) {
						margin: 0;
						font-family: 'Text', sans-serif;
						font-size: 16px;
						line-height: 1.5;
						overscroll-behavior: none;
						touch-action: none;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
						font-smoothing: antialiased;
						font-weight: 400;
						color: ${BLACK};
					}
					:global(*){
						box-sizing: border-box;
					}
					:global(a) {
						color: inherit;
					}
					:global(html),
					:global(body),
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
					.root :global(> *:nth-child(1)) {
						position: relative;
						z-index: 2;
						height: 3rem;
					}
					.root :global(> *:nth-child(2)) {
						position: relative;
						z-index: 1;
						height: calc(100% - 5rem);
					}
					.root :global(> *:nth-child(3)) {
						position: relative;
						z-index: 2;
						height: 2rem;
					}
					.root :global(> .page) {
						overflow-y: scroll;
					}
					:global(button) {
						border: none;
						margin: 0;
						padding: 0;
						width: auto;
						overflow: visible;
						background: transparent;
						color: inherit;
						font: inherit;
						text-align: inherit;
						line-height: normal;
						-webkit-font-smoothing: inherit;
						-moz-osx-font-smoothing: inherit;
						-webkit-appearance: none;
						cursor: pointer;
					}
					:global(button::-moz-focus-inner) {
						border: 0;
						padding: 0;
					}
					/* Typogrphy */
					:global(.global-type) {
						vertical-align: baseline;
						font-family: inherit;
						font-weight: inherit;
						font-style: inherit;
						font-size: 100%;
						outline: 0;
						padding: 0;
						margin: 0;
						border: 0;
					}
					:global(.global-type p:first-child) {
						margin-top: 0;
					}
					:global(.global-type p:last-child) {
						margin-bottom: 0;
					}
					:global(.global-type-h1),
					:global(.global-type-h2),
					:global(.global-type-h3),
					:global(.global-type-h4) {
						font-weight: bold;
						text-transform: uppercase;
						line-height: 1;
						margin-bottom: 1rem;
					}
					:global(.global-type-h1) {
						font-size: 2.5rem;
					}
					:global(.global-type-h2) {
						font-size: 2.0rem;
					}
					:global(.global-type-h3) {
						font-size: 1.5rem;
					}
					:global(.global-type-h4) {
						font-size: 1rem;
					}
					/* Page error */
					/*.root :global(.pageError) {
						position: fixed !important;
						width: 100% !important;
						height: 100% !important;
						z-index: 999 !important;
					}*/
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

				<StorageManager />
				<NavigationManager />
				<MidiInterfaceManager />
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
	setRoutes            : PropTypes.func,
	setLocales           : PropTypes.func,
	setStrings           : PropTypes.func,
	setDisplayPageLoader : PropTypes.func,
	setupEditor          : PropTypes.func,
	displayPageLoader    : PropTypes.bool,
	displayError         : PropTypes.PropTypes.oneOf([false, 404, 500]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(AppContainer)
