// import PropTypes from 'prop-types'
// import NodeIconsListContainer from '../containers/nodeIconsListContainer'
import PhysicalNodesContainer from '../containers/physicalNodesContainer'

const QuirkbotSimulator = () =>
	<div className='root quirkbotSimulator'>
		<style jsx>{`
			.root {
				background-color: red;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

		`}</style>
		{/*
			<div className='controls'>
			<div>controls</div>
			</div>
		*/}
		<PhysicalNodesContainer/>
		{/* <div className='nodes'>
			<div>nodes</div>
			<NodeIconsListContainer/>
			</div>
		*/}
	</div>

QuirkbotSimulator.defaultProps = {
}

QuirkbotSimulator.propTypes = {
}

export default QuirkbotSimulator
