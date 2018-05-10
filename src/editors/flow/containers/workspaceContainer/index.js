import { connect } from 'react-redux'
import Workspace from 'src/editors/flow/components/workspace'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(Workspace)
