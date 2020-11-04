// import PropTypes from 'prop-types'
import { withResizeDetector } from 'react-resize-detector'
// import NodeIconsListContainer from '../containers/nodeIconsListContainer'
import PhysicalNodesContainer from '../containers/physicalNodesContainer'

const QuirkbotSimulator = ({
	width,
	targetRef,
}) => {
	console.log(width, targetRef.current)
	return (
		<div className='root quirkbotSimulator' ref={targetRef}>
			<style jsx>{`
				.root {
					background-color: white;
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
			`}</style>
			{/*
				<div className='controls'>
				<div>controls</div>
				</div>
			*/}
			<PhysicalNodesContainer containerWidth={width}/>
			{/* <div className='nodes'>
				<div>nodes</div>
				<NodeIconsListContainer/>
				</div>
			*/}
		</div>
	)
}


QuirkbotSimulator.defaultProps = {
}

QuirkbotSimulator.propTypes = {
}

const QuirkbotSimulatorWithResizeDetector = withResizeDetector(QuirkbotSimulator)

export default QuirkbotSimulatorWithResizeDetector
