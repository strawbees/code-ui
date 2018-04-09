import { connect } from 'react-redux'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SingleBoardStatus)
