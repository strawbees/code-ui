import PropTypes from 'prop-types'
import S from 'src/containers/sManager'

const StorageProgramListItem = ({
	name,
	type,
	createdAt,
	uploadEnabled,
	onEditPress,
	onRemovePress,
	onDuplicatePress,
	onSharePress,
	onUploadPress
}) =>
	<div className='root storageProgramListItem'>
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
		<button onClick={onUploadPress} disabled={!uploadEnabled}>
			<S value='ui.editor.upload'/>
		</button>
	</div>

StorageProgramListItem.defaultProps = {
}

StorageProgramListItem.propTypes = {
	name             : PropTypes.string,
	type             : PropTypes.string,
	createdAt        : PropTypes.string,
	uploadEnabled    : PropTypes.bool,
	onEditPress      : PropTypes.func,
	onRemovePress    : PropTypes.func,
	onDuplicatePress : PropTypes.func,
	onSharePress     : PropTypes.func,
	onUploadPress    : PropTypes.func,
}

export default StorageProgramListItem
