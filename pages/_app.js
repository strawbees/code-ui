import React from 'react'
import withRedux from 'next-redux-wrapper'
import makeStore from 'src/store'

class NextApp extends React.Component {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps : {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
			}
		}
	}

	render() {
		const { Component, pageProps } = this.props
		return (
			<Component {...pageProps} />
		)
	}
}

export default withRedux(
	makeStore
)(NextApp)
