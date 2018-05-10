import React from 'react'

class AceEditor extends React.Component {
	state = {
		isMounted : false
	}
	componentDidMount() {
		this.setState({ isMounted : true })
	}
	render() {
		const { isMounted } = this.state
		// Ace does not support SSR, so it can only be displayed after mounting
		// on client side.
		if (isMounted && typeof window !== 'undefined') {
			/* eslint-disable global-require */
			const Ace = require('react-ace').default
			require('./mode/c_quirkbot')
			require('./theme/quirkbot')
			/* eslint-enable global-require */
			return (
				<Ace
					mode='c_quirkbot'
					theme='quirkbot'
					height='100%'
					width='100%'
					fontSize={14}
					showPrintMargin={false}
					editorProps={{ $blockScrolling : true }}
					{...this.props}
				/>
			)
		}
		return null
	}
}

export default AceEditor
