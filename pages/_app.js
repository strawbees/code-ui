import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import makeStore from 'src/store'


if (process.browser && process.env.NODE_ENV !== 'production') {
	/* eslint-disable-next-line global-require */
	const { whyDidYouUpdate } = require('why-did-you-update')
	whyDidYouUpdate(React)
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
