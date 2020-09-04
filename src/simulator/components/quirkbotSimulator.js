import PropTypes from 'prop-types'
import NodeIconsListContainer from '../containers/nodeIconsListContainer'

const QuirkbotSimulator = () =>
	<div className='root quirkbotSimulator'>
		<style jsx>{`
			.root {
				background-color: red;
			}
		`}</style>
		<div>Simulator</div>
		<NodeIconsListContainer/>
	</div>

QuirkbotSimulator.defaultProps = {
}

QuirkbotSimulator.propTypes = {
}

export default QuirkbotSimulator
