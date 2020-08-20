import { connect } from 'react-redux'
import Workspace from 'src/editors/flow/components/workspace'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const WorkspaceContainer = (props) =>
	<Workspace {...props} />

const workspaceContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(WorkspaceContainer)

export default workspaceContainerConnected
