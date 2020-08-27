import PropTypes from 'prop-types'

const QuirkbotSimulator = () => {
	return (
		<div className='root quirkbotSimulator'>
			<style jsx>{`
				.root {
					background-color: red;
				}
			`}</style>
			Quirkbot Simulator
		</div>
	)
}
QuirkbotSimulator.defaultProps = {
}

QuirkbotSimulator.propTypes = {

}

export default QuirkbotSimulator
