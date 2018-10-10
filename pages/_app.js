import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import makeStore from 'src/store'

// handle redirects
if (process.browser) {
	const {
		pathname,
		search,
		hash
	} = window.location
	const searchHash = `${search}${hash}`
	// /reset/#/xxxxx -> /reset-password/?t=xxxxx
	if ((pathname === '/reset/' ||
		pathname === '/reset') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash
			.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		window.location = `/reset-password/?t=${id}`
	}
	// /confirm/#/xxxxx -> /confirm-email/?t=xxxxx
	if ((pathname === '/confirm/' ||
		pathname === '/confirm') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash
			.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		window.location = `/confirm-email/?t=${id}`
	}
	// /program/#!/xxxxx -> /flow/?p=xxxxx
	if ((pathname === '/program/' ||
		pathname === '/program') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash
			.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		window.location = `/flow/?p=${id}`
	}
	// /program/xxxxx -> /flow/?p=xxxxx
	if (pathname.indexOf('/program/') === 0 &&
		search === '') {
		const id = pathname.replace('/program/', '')
		window.location = `/flow/?p=${id}`
	}
	//  /flow/?p=/#!/xxxxx -> /flow/?p=xxxxx
	if (pathname.indexOf('/flow/') === 0 &&
		(searchHash.indexOf('?p=/#!/') === 0 ||
		searchHash.indexOf('?p=#!/') === 0 ||
		searchHash.indexOf('?p=#!') === 0 ||
		searchHash.indexOf('?p=/#/') === 0 ||
		searchHash.indexOf('?p=#/') === 0 ||
		searchHash.indexOf('?p=#') === 0)) {
		const id = searchHash
			.replace('?p=/#!/', '')
			.replace('?p=#!/', '')
			.replace('?p=#!', '')
			.replace('?p=/#/', '')
			.replace('?p=#/', '')
			.replace('?p=#', '')

		window.location = `/flow/?p=${id}`
	}
	// /user/#!/xxxxx -> /user/?u=sb/xxxxx
	if ((pathname === '/user/' ||
		pathname === '/user') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		window.location = `/user/?u=sb/${id}`
	}
	// /user/xxxxx -> -> /user/?u=sb/xxxxx
	if (pathname.indexOf('/user/') === 0 &&
		search === '') {
		const id = pathname.replace('/user/', '')
		window.location = `/user/?u=sb/${id}`
	}
}

if (process.browser && process.env.NODE_ENV !== 'production') {
	/* eslint-disable-next-line global-require */
	// const { whyDidYouUpdate } = require('why-did-you-update')
	// whyDidYouUpdate(React)
}
// register the service worker
if (process.browser && process.env.NODE_ENV === 'production') {
	if ('serviceWorker' in navigator) {
		// Use the window load event to keep the page load performant
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('/service-worker.js')
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

	render() {
		const { Component, pageProps, store } = this.props
		return (
			<Container>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		)
	}
}

export default withRedux(
	makeStore
)(NextApp)
