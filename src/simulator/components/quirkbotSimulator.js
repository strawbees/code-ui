import PropTypes from 'prop-types'
import { withResizeDetector } from 'react-resize-detector'
import WarningDisconnectedReportListContainer from '../containers/warningDisconnectedReportListContainer'
import ErrorSamePlaceReportListContainer from '../containers/errorSamePlaceReportListContainer'

// import NodeIconsListContainer from '../containers/nodeIconsListContainer'
import PhysicalRepresentationContainer from '../containers/physicalRepresentationContainer'

const QuirkbotSimulator = ({
	width,
	targetRef,
}) =>
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
		<PhysicalRepresentationContainer containerWidth={width}/>
		<WarningDisconnectedReportListContainer />
		<ErrorSamePlaceReportListContainer />
		{/* <div className='nodes'>
			<div>nodes</div>
			<NodeIconsListContainer/>
			</div>
		*/}
	</div>

QuirkbotSimulator.defaultProps = {
	width : 100
}

QuirkbotSimulator.propTypes = {
	width     : PropTypes.number,
	targetRef : PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current : PropTypes.any }
		)]
	),
}

const QuirkbotSimulatorWithResizeDetector = withResizeDetector(QuirkbotSimulator)

export default QuirkbotSimulatorWithResizeDetector
