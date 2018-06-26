import PropTypes from 'prop-types'
import Link from 'src/components/link'
import S from 'src/containers/sManager'

const StorageProgramListItem = ({
	name,
	url,
	type,
	createdAt,
	onRemovePress,
	onDuplicatePress,
	onSharePress,
	onUploadPress
}) =>
	<div className='root storageProgramListItem'>
		<style jsx>{`
			.root {
				border: solid 1px;
			}
			.root :global(.link){
				border: solid 1px;
			}
		`}</style>
		<Link to={url}>
			<div className='name'>{name}</div>
			<div className='type'>{type}</div>
			<div className='createdAt'>{createdAt}</div>
		</Link>
		<button onClick={onRemovePress}>
			<S value='ui.editor.remove'/>
		</button>
		<button onClick={onDuplicatePress}>
			<S value='ui.editor.duplicate'/>
		</button>
		<button onClick={onSharePress}>
			<S value='ui.editor.share'/>
		</button>
		<button onClick={onUploadPress}>
			<S value='ui.editor.upload'/>
		</button>
	</div>

StorageProgramListItem.defaultProps = {
}

StorageProgramListItem.propTypes = {
	name             : PropTypes.string,
	url              : PropTypes.string,
	type             : PropTypes.string,
	createdAt        : PropTypes.string,
	onEditPress      : PropTypes.func,
	onRemovePress    : PropTypes.func,
	onDuplicatePress : PropTypes.func,
	onSharePress     : PropTypes.func,
	onUploadPress    : PropTypes.func,
}

export default StorageProgramListItem
