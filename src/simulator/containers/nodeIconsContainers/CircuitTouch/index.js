import { connect } from 'react-redux'
import CircuitTouch from '../../../components/nodeIcons/CircuitTouch'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const CircuitTouchContainer = (props) =>
	<CircuitTouch
		{...props}
	/>

const CircuitTouchContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(CircuitTouchContainer)

export default CircuitTouchContainerConnected
