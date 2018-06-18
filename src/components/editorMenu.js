import React from 'react'
import PropTypes from 'prop-types'
import S from 'src/containers/sManager'

const EditorMenu = ({
	name,
	saved,
	placeholderName,
	onNameChange,
	onNewPress,
	onSavePress,
	onSharePress,
	onUploadPress
}) =>
	<div className='root editorMenu'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
			}
		`}</style>
		<input
			type="text"
			value={name}
			placeholder={placeholderName}
			onChange={e => onNameChange(e.target.value)}
		/>
		{!saved &&
			<button onClick={onSavePress}>
				<S value='ui.editor.save'/>
			</button>
		}
		<button onClick={onNewPress}>
			<S value='ui.editor.new'/>
		</button>
		<button onClick={onSharePress}>
			<S value='ui.editor.share'/>
		</button>
		<button onClick={onUploadPress} >
			<S value='ui.editor.upload'/>
		</button>
	</div>

EditorMenu.defaultProps = {}

EditorMenu.propTypes = {
	name            : PropTypes.string,
	saved           : PropTypes.bool,
	placeholderName : PropTypes.string,
	onNameChange    : PropTypes.func,
	onNewPress      : PropTypes.func,
	onSavePress     : PropTypes.func,
	onSharePress    : PropTypes.func,
	onUploadPress   : PropTypes.func,
}

export default EditorMenu
