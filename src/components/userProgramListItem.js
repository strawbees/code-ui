import PropTypes from 'prop-types'
import S from 'src/containers/sContainer'

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
		<button onClick={onEditPress}>
			<S value='ui.editor.edit'/>
		</button>
		<button onClick={onRemovePress}>
			<S value='ui.editor.remove'/>
		</button>
		<button onClick={onDuplicatePress}>
			<S value='ui.editor.duplicate'/>
		</button>
		<button onClick={onSharePress}>
			<S value='ui.editor.share'/>
		</button>
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
