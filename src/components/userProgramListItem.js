import PropTypes from 'prop-types'

const UserProgramListItem = ({
	name,
	type,
	createdAt,
	edit,
	remove,
	duplicate,
	share
}) =>
	<div className='root userProgramListItem'>
		<div className='name'>{name}</div>
		<div className='type'>{type}</div>
		<div className='createdAt'>{createdAt}</div>
		<button onClick={edit}>edit</button>
		<button onClick={remove}>remove</button>
		<button onClick={duplicate}>duplicate</button>
		<button onClick={share}>share</button>
	</div>

UserProgramListItem.defaultProps = {
}

UserProgramListItem.propTypes = {
	name      : PropTypes.string,
	type      : PropTypes.string,
	createdAt : PropTypes.string,
	edit      : PropTypes.func,
	remove    : PropTypes.func,
	duplicate : PropTypes.func,
	share     : PropTypes.func
}

export default UserProgramListItem
