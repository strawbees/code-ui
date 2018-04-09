import { connect } from 'react-redux'
import UserProgramListItem from 'src/components/userProgramListItem'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UserProgramListItem)
