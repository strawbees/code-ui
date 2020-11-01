import { connect } from 'react-redux'
import DualColorLed from '../../../components/nodeParts/DualColorLed'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const DualColorLedContainer = (props) =>
	<DualColorLed
		{...props}
	/>

const DualColorLedContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(DualColorLedContainer)

export default DualColorLedContainerConnected
