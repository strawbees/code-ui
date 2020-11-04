import { connect } from 'react-redux'
import PhysicalNodes from '../../components/physicalNodes'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PhysicalNodesContainer = (props) =>
	<PhysicalNodes
		{...props}
	/>

const PhysicalNodesContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PhysicalNodesContainer)

export default PhysicalNodesContainerConnected
