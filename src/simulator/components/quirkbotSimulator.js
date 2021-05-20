import PropTypes from 'prop-types'
import { withResizeDetector } from 'react-resize-detector'
import ErrorSamePlaceReportListContainer from '../containers/errorSamePlaceReportListContainer'
import PhysicalRepresentationContainer from '../containers/physicalRepresentationContainer'
import PlotterNodeListContainer from '../containers/plotterNodeListContainer'
import WarningDisconnectedReportListContainer from '../containers/warningDisconnectedReportListContainer'

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
				user-select: none;
			}
		`}</style>
		{/*
			<div className='controls'>
			<div>controls</div>
			</div>
		*/}
		<WarningDisconnectedReportListContainer />
		<ErrorSamePlaceReportListContainer />
		<PhysicalRepresentationContainer containerWidth={width}/>
		<PlotterNodeListContainer containerWidth={width}/>
		{/* <div className='nodes'>
			<div>nodes</div>
			<NodeIconsListContainer/>
			</div>
		*/}
	</div>

QuirkbotSimulator.defaultProps = {
	width : 320,
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
