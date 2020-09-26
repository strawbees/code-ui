import { connect } from 'react-redux'
import NodeIconsList from '../../components/nodeIconsList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const NodeIconsListContainer = (props) =>
	<NodeIconsList
		{...props}
	/>

const NodeIconsListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeIconsListContainer)

export default NodeIconsListContainerConnected
