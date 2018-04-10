import PropTypes from 'prop-types'

const UserProgramListItem = ({
	name,
	type,
	createdAt,
	onEditPress,
	onRemovePress,
	onDuplicatePress,
	onSharePress
}) =>
	<div className='root userProgramListItem'>
		<div className='name'>{name}</div>
		<div className='type'>{type}</div>
		<div className='createdAt'>{createdAt}</div>
		<button onClick={onEditPress}>edit</button>
		<button onClick={onRemovePress}>remove</button>
		<button onClick={onDuplicatePress}>duplicate</button>
		<button onClick={onSharePress}>share</button>
	</div>

UserProgramListItem.defaultProps = {
}

UserProgramListItem.propTypes = {
	name             : PropTypes.string,
	type             : PropTypes.string,
	createdAt        : PropTypes.string,
	onEditPress      : PropTypes.func,
	onRemovePress    : PropTypes.func,
	onDuplicatePress : PropTypes.func,
	onSharePress     : PropTypes.func
}

export default UserProgramListItem
