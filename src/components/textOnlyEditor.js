import React from 'react'
import PropTypes from 'prop-types'

const TextOnlyEditor = ({
	safeOpenModal,
	closeModal,
	TextEditor,
	type,
	...textEditorProps
}) =>
	<div className='root textOnlyEditor'>
		<style jsx>{`
			.root {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		`}</style>
		<TextEditor {...textEditorProps} />
	</div>

TextOnlyEditor.propTypes = {
	TextEditor : PropTypes.PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.object,
	]),
	safeOpenModal : PropTypes.func,
	type          : PropTypes.string,
}

export default TextOnlyEditor
