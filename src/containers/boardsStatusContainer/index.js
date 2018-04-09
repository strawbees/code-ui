import { connect } from 'react-redux'
import BoardsStatus from 'src/components/boardsStatus'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(BoardsStatus)
