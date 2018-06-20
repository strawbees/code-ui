import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'
import MirrorEditorContainer from 'src/containers/mirrorEditorContainer'
import { WHITE, BLACK } from 'src/constants/colors'
import textIcon from 'src/assets/icons/editors/small/textWhite.svg'

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
			@media (max-width: 500px) {
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
				background-color: ${tinycolor(BLACK).toRgbString()};
				color: ${tinycolor(WHITE).toRgbString()};
				cursor: pointer;
				position: absolute;
				padding-right: 0;
				top: 0.5rem;
				right: 0.5rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
				z-index: 100;
				border-radius: 0.4rem;
				opacity: 0.5;
				transition: padding-right 0.2s;
			}
			.button :global(>.svgIcon) {
				width: 2.8rem;
				height: 2.8rem;
				margin: -0.45rem -0.35rem -0.44rem -0.37rem;
			}
			.button .text {
				width: 5rem;
				line-height: 1.2;
				font-size: 0.6rem;
				letter-spacing: 0.02rem;
				text-transform: uppercase;
				opacity: 0;
				transform-origin: left;
				width: 0;
				height: 1.35rem;
				pointer-events: none;
				transform: scaleX(0);
				transition: width 0.2s 0.2s, opacity 0.2s, transform 0.2s;
			}
			.button:hover,
			.button:focus {
				outline: none;
				opacity: 1;
				padding-right: 0.2rem;
			}
			.button:hover .text,
			.button:focus .text {
				width: 5rem;
				opacity: 1;
				transform: scaleX(1);
				transition: width 0.2s, opacity 0.2s 0.2s, transform 0.2s 0.2s;
			}
		`}</style>
		<VisualEditor {...visualEditorProps} />
		<button
			className='button'
			onClick={() => {
				// lose focus
				document.activeElement.blur()
				openModal(<TextEditor/>)
			}}>
			<SvgIcon icon={textIcon} />
			<div className='text'>
				<S value='ui.editor.text_preview.button'/>
			</div>
		</button>

	</div>

VisualToTextEditor.propTypes = {
	VisualEditor : PropTypes.func,
	openModal    : PropTypes.func,
}

export default VisualToTextEditor
