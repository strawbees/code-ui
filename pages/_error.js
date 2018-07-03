import React from 'react'
import PageError from 'src/components/pageError'

export default class Error extends React.Component {
	static getInitialProps({ res, err }) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null
		return { statusCode }
	}

	render() {
		return (
			<PageError statusCode={this.props.statusCode}/>
		)
	}
}
