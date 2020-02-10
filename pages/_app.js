import React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import getConfig from 'next/config'
import makeStore from 'src/store'
import redirects from 'src/redirects'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'

const {
	publicRuntimeConfig : {
		URL_SCHEME,
		ROOT_PATH
	}
} = getConfig()

// handle redirects
if (process.browser) {
	const newLocation = redirects(window.location)
	if (newLocation) {
		window.location = newLocation
	}
}

// register the service worker
if (process.browser) {
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			navigator.serviceWorker.register(`${ROOT_PATH}/service-worker.js`)
		})
	}
}

class NextApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps : {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			}
		}
	}

	componentDidMount() {
		// handle the URL scheme requests
		if (window.nw) {
			const openUrlScheme = (url) => {
				// replace the custom scheme with a dummy http-ish
				// scheme, so we can parse it like a normal URL
				url = url.replace(`${URL_SCHEME}://`, `http://${URL_SCHEME}/`)
				const redirectedLocation = redirects(url)
				if (typeof redirectedLocation !== 'undefined') {
					url = `http://${URL_SCHEME}${redirectedLocation}`
				}
				let pathname
				let search
				let hash
				try {
					({
						pathname,
						search,
						hash
					} = new URL(url))
				} catch (e) {
					return
				}
				let to = `${pathname}${pathname.endsWith('/') ? '' : '/'}${search}${hash}`
				if (ROOT_PATH && to.indexOf(ROOT_PATH) !== 0) {
					to = `${ROOT_PATH}/${to}`
				}
				to = to.replace('//', '/')
				const {
					href,
					as
				} = resolveLinkUrl(to)
				// eslint-disable-next-line no-console
				console.log('Opening via URL Scheme', url, to, href, as)
				if (as) {
					Router.push(href, as)
				} else {
					// eslint-disable-next-line no-console
					console.log('This url cannot be resolved internally', to)
				}
			}
			// Runs when the app is already open and someone opens the link
			window.nw.App.on('open', (arg) => {
				// At least on Windows, the argment will not be just the url,
				// but instead the whole command line call, with the url at the
				// end. So first we will make sure there is nothing before the
				// url.
				const base = `${URL_SCHEME}://`
				const url = `${base}${arg.split(base).pop()}`
				openUrlScheme(url)
			})
			// Runs on the start of the application
			if (window.nw.App.argv && window.nw.App.argv.length) {
				for (let i = 0; i < window.nw.App.argv.length; i++) {
					const arg = window.nw.App.argv[i]
					if (arg.indexOf(`${URL_SCHEME}://`) === 0) {
						openUrlScheme(arg)
						break
					}
				}
			}
		}
	}

	render() {
		const { Component, pageProps, store } = this.props
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		)
	}
}

export default withRedux(
	makeStore
)(NextApp)
