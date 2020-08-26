import { connect } from 'react-redux'
import UserHeaderAvatar from 'src/components/userHeaderAvatar'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const UserHeaderAvatarContainer = (props) =>
	<UserHeaderAvatar {...props} />

const userHeaderAvatarContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UserHeaderAvatarContainer)

export default userHeaderAvatarContainerConnected
