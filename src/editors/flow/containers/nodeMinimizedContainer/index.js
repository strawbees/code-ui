import { connect } from 'react-redux'
import NodeMinimized from 'src/editors/flow/components/nodeMinimized'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeMinimized)
