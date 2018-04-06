import { connect } from 'react-redux'
import UserProgramListItem from 'src/components/userProgramListItem'
import userProgramListItemContainerSelector from 'src/selectors/containers/userProgramListItemContainerSelector'

const mapStateToProps = userProgramListItemContainerSelector

export default connect(
	mapStateToProps
)(UserProgramListItem)
