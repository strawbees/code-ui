import React from 'react'
import PropTypes from 'prop-types'

const EditorMenu = ({
	name,
	saved,
	saveButtonLabel,
	shareButtonLabel,
	uploadButtonLabel,
	placeholderName,
	setName,
	setSaved,
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
			onChange={e => setName(e.target.value)}
		/>
		{!saved &&
			<button onClick={() => setSaved(true)}>
				{saveButtonLabel}
			</button>
		}
		<button onClick={onSharePress}>
			{shareButtonLabel}
		</button>
		<button onClick={onUploadPress}>
			{uploadButtonLabel}
		</button>
	</div>

EditorMenu.defaultProps = {}

EditorMenu.propTypes = {
	name              : PropTypes.string,
	saved             : PropTypes.bool,
	placeholderName   : PropTypes.string,
	saveButtonLabel   : PropTypes.string,
	shareButtonLabel  : PropTypes.string,
	uploadButtonLabel : PropTypes.string,
	setName           : PropTypes.func,
	setSaved          : PropTypes.func,
	onSharePress      : PropTypes.func,
	onUploadPress     : PropTypes.func,
}

export default EditorMenu
