import { connect } from 'react-redux'
import NodeMini from 'src/editors/flow/components/nodeMini'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeMini)
