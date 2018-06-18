import React from 'react'
import PropTypes from 'prop-types'
import S from 'src/containers/sManager'
import MirrorEditorContainer from 'src/containers/mirrorEditorContainer'

const TextEditor = () =>
	<div className='root'>
		<style jsx>{`
			.root {

			}
			.editor {
				width: 70vw;
				height: 70vh;
				border-radius: 1rem;
				overflow: hidden;
			}
			@media (max-width : 500px) {
				.editor {
					width: 100%;
				}
			}
		`}</style>
		<div className='editor'>
			<MirrorEditorContainer
				readOnly={true}
			/>
		</div>
	</div>


const VisualToTextEditor = ({
	openModal,
	VisualEditor,
	...visualEditorProps
}) =>
	<div className='root visualToTextEditor'>
		<style jsx>{`
			.root {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
			.button {
				background-color: white;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				flex-direction: row;
				z-index: 100;
			}
			/* .switch.visual .visual {
				font-weight: bold
			}
			.switch.text .text {
				font-weight: bold
			}
			.editor {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.editor.text :global(>*:nth-child(1)) {
				display: none;
			}
			.editor.visual :global(>*:nth-child(2)) {

				transform-origin: top left;
				transform: scale3d(0,0,0);
			}*/
		`}</style>
		<VisualEditor {...visualEditorProps} />
		<div
			onClick={() => openModal(<TextEditor/>)}
			className='button'>
			<S value='ui.editor.switch.text'/>
		</div>

		{/* <div className={`editor ${displayVisual ? 'visual' : 'text'}`}>
			<VisualEditor {...visualEditorProps} />
			<MirrorEditorContainer
				readOnly={true}
			/>
		</div>
		<div className={`switch ${displayVisual ? 'visual' : 'text'}`}>
			<div onClick={showVisual}
				className='visual'>
				<S value='ui.editor.switch.visual'/>
			</div>
			<div onClick={showText}
				className='text'>
				<S value='ui.editor.switch.text'/>
			</div>
		</div> */}
	</div>

VisualToTextEditor.propTypes = {
	VisualEditor : PropTypes.func,
	openModal    : PropTypes.func,
}

export default VisualToTextEditor
