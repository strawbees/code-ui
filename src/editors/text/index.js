import React from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'src/components/aceEditor'

const TextEditor = ({
	source,
	onSourceChange,
}) =>
	<AceEditor
		value={source || ''}
		fontSize={16}
		onChange={onSourceChange}
	/>

TextEditor.propTypes = {
	source         : PropTypes.string,
	onSourceChange : PropTypes.func
}

export default TextEditor
