import { connect } from 'react-redux'
import UserProfileAvatar from 'src/components/userProfileAvatar'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const UserProfileAvatarContainer = (props) =>
	<UserProfileAvatar {...props} />

const userProfileAvatarContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UserProfileAvatarContainer)

export default userProfileAvatarContainerConnected
