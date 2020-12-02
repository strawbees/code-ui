import { connect } from 'react-redux'
import ServoMotor from '../../../components/nodeParts/ServoMotor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ServoMotorContainer = (props) =>
	<ServoMotor
		{...props}
	/>

const ServoMotorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ServoMotorContainer)

export default ServoMotorContainerConnected
