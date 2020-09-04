import { connect } from 'react-redux'
import NodePartsList from '../../components/nodePartsList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const NodePartsListContainer = (props) =>
	<NodePartsList
		{...props}
	/>

const NodePartsListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodePartsListContainer)

export default NodePartsListContainerConnected
