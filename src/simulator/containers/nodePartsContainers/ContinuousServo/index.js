import { connect } from 'react-redux'
import ContinuousServo from '../../../components/nodeParts/ContinuousServo'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ContinuousServoContainer = (props) =>
	<ContinuousServo
		{...props}
	/>

const ContinuousServoContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ContinuousServoContainer)

export default ContinuousServoContainerConnected
