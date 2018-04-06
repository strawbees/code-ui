import { connect } from 'react-redux'
import UserProgramList from 'src/components/userProgramList'
import userProgramListContainerSelector from 'src/selectors/containers/userProgramListContainerSelector'

const mapStateToProps = userProgramListContainerSelector

export default connect(
	mapStateToProps
)(UserProgramList)
