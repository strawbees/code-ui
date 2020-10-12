import React from 'react'
import PropTypes from 'prop-types'
import QuirkbotSimulatorContainer from 'src/simulator/containers/quirkbotSimulatorContainer'

const TextOnlyEditor = ({
	safeOpenModal,
	closeModal,
	TextEditor,
	type,
	...textEditorProps
}) =>
	<div className='root visualToTextEditor'>
		<style jsx>{`
			.root {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			.root :global(.quirkbotSimulator) {
				position: absolute;
				bottom: 0;
				right: 0;
			}
		`}</style>
		<TextEditor {...textEditorProps} />
		<QuirkbotSimulatorContainer />
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
