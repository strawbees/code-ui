import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import withSetup from 'src/hoc/withSetup'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'
import parseUrlVars from 'src/utils/parseUrlVars'
import loadStaticData from 'src/utils/loadStaticData'
import appContainerSelector from 'src/selectors/containers/appContainerSelector'
import * as setupActions from 'src/actions/setup'

import HeadContainer from 'src/containers/headContainer'
import HeaderContainer from 'src/containers/headerContainer'
import FooterContainer from 'src/containers/footerContainer'
import PageContainer from 'src/containers/pageContainer'
import MidiInterfaceContainer from 'src/containers/midiInterfaceContainer'
import StorageManagerContainer from 'src/containers/storageManagerContainer'


class AppContainer extends React.Component {
	static async setup({
		// next props
		query,
		asPath,
		isServer,
		// state to props
		routesLoaded,
		localesLoaded,
		stringsLoaded,
		// dispatch to props
		setQuery,
		setRoutes,
		setLocales,
		setStrings,
		setAsPath,
		setUrlVars
	}) {
		setQuery(query)
		if (!routesLoaded) {
			setRoutes(await loadStaticData('routes.json'))
		}
		if (!localesLoaded) {
			setLocales(await loadStaticData('locales/locales.json'))
		}
		if (!stringsLoaded[query.locale]) {
			setStrings({
				locale : query.locale,
				data   : await loadStaticData(`locales/${query.locale}/computed.json`)
			})
		}
		if (!isServer) {
			setAsPath(asPath)
			setUrlVars(parseUrlVars(asPath))
		}
	}

	async componentDidMount() {
		// hookup nprogress
		Router.router.events.on('routeChangeStart', NProgress.start)
		Router.router.events.on('routeChangeComplete', NProgress.done)
		Router.router.events.on('routeChangeError', NProgress.done)
		// adjust as path on first render
		const {
			setAsPath,
			setUrlVars
		} = this.props
		setAsPath(Router.router.asPath)
		setUrlVars(parseUrlVars(Router.router.asPath))
	}

	componentWillUnmount() {
		// unhook nprogress
		Router.router.events.off('routeChangeStart', NProgress.start)
		Router.router.events.off('routeChangeComplete', NProgress.done)
		Router.router.events.off('routeChangeError', NProgress.done)
	}

	shouldComponentUpdate() {
		// Since we don't really pass down any props/state, we just need
		// to render once.
		return false
	}

	render() {
		return (
			<div className="root app">
				<style jsx>{`
					/* This stylesheet generated by Transfonter (https://transfonter.org) on August 4, 2017 2:45 PM */
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Medium.eot'); src: url('/static/fonts/BrandonText-Medium.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Medium.woff2') format('woff2'),url('/static/fonts/BrandonText-Medium.woff') format('woff'),url('/static/fonts/BrandonText-Medium.ttf') format('truetype'); font-weight: 500; font-style: normal; }
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Regular.eot'); src: url('/static/fonts/BrandonText-Regular.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Regular.woff2') format('woff2'),url('/static/fonts/BrandonText-Regular.woff') format('woff'),url('/static/fonts/BrandonText-Regular.ttf') format('truetype'); font-weight: normal; font-style: normal; }
					@font-face { font-family: 'Brandon Text'; src: url('/static/fonts/BrandonText-Bold.eot'); src: url('/static/fonts/BrandonText-Bold.eot?#iefix') format('embedded-opentype'),url('/static/fonts/BrandonText-Bold.woff2') format('woff2'),url('/static/fonts/BrandonText-Bold.woff') format('woff'),url('/static/fonts/BrandonText-Bold.ttf') format('truetype'); font-weight: bold; font-style: normal; }

					:global(html),
					:global(body) {
						margin: 0;
						font-family: 'Brandon Text', sans-serif;
						font-size: 16px;
						line-height: 1.5;
					}
					:global(*){
						box-sizing: border-box;
					}
					:global(a) {
						color: inherit;
					}
					.root {
						position: fixed;
						height: 100vh;
						width: 100vw;
						display: grid;
						grid-template-columns: 1fr;
						grid-template-rows: 2rem auto 2rem;
					}
					.root :global(> .page) {
						overflow-y: scroll;
						-webkit-overflow-scrolling: touch;
					}
				`}</style>
				<div
					id="remotestorage-widget-container"
					style={{ display : 'none' }}/>
				<HeadContainer />
				<HeaderContainer />
				<PageContainer />
				<FooterContainer />
				<MidiInterfaceContainer />
				<StorageManagerContainer />
			</div>
		)
	}
}

const mapStateToProps = appContainerSelector
const mapDispatchToProps = autobindDispatchToProps(setupActions)

export default withSetup(
	AppContainer,
	mapStateToProps,
	mapDispatchToProps
)
