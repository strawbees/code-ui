export default props => {
	if (typeof window !== 'undefined') {
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
				{...props}
			/>
		)
	}
	return null
}
