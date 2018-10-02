import { connect } from 'react-redux'
import UserHeaderAvatar from 'src/components/userHeaderAvatar'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const UserHeaderAvatarContainer = (props) =>
	<UserHeaderAvatar {...props} />

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UserHeaderAvatarContainer)
