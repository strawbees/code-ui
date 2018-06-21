import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import SvgIcon from 'src/components/svgIcon'
import IconButton from 'src/components/iconButton'
import S from 'src/containers/sManager'
import MirrorEditorContainer from 'src/containers/mirrorEditorContainer'
import { WHITE, BLACK } from 'src/constants/colors'
import editorIcons from 'src/assets/icons/editors/small'
import arrowIcon from 'src/assets/icons/general/arrowRight.svg'

const TextEditor = ({ type }) =>
	<div className='root'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				width: 40rem;
				height: 85vh;
			}
			.editor {
				flex: 1;
				border-radius: 1rem;
				overflow: hidden;
				margin-bottom: 1rem;
				margin-left: -0.25rem;
				margin-right: -0.25rem;
			}
			.description {
				margin-bottom: 1rem;
			}
			.new {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin: -1rem 0;
			}
			.new .icon {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.new :global(.svgIcon) {
				width: 4rem;
				height: 4rem;
			}
			.new :global(.arrow) {
				width: 2.5rem;
				margin-right: -0.5rem;
			}
			@media (max-width: 750px) {
				.root {
					width: auto;
				}
			}
			@media (max-width: 475px) {
				.new  {
					margin-top: 0;
					margin-bottom: 0;
					justify-content: flex-end;
				}
				.new .icon {
					display: none;
				}
			}

		`}</style>
		<div className='title global-type global-type-h3'>
			<S
				value='ui.editor.text_preview.title'
			/>
		</div>
		<div className='description global-type'>
			<S
				value='ui.editor.text_preview.description'
				markdown={true}
			/>
		</div>
		<div className='editor'>
			<MirrorEditorContainer
				readOnly={true}
			/>
		</div>
		<div className='new'>
			<div className='icon'>
				<SvgIcon icon={type === 'scratch' ? editorIcons.scratch : editorIcons.flow }/>
				<SvgIcon icon={arrowIcon} className='arrow'/>
				<SvgIcon icon={editorIcons.text}/>
			</div>
			<IconButton
				labelKey='ui.editor.text_preview.create'
				textColor={WHITE}
				textHoverColor={WHITE}
				bgColor={BLACK}
				bgHoverColor={BLACK}
			/>
		</div>
	</div>

const VisualToTextEditor = ({
	openModal,
	VisualEditor,
	type,
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
				line-height: 0.75rem;
				font-size: 0.6rem;
				letter-spacing: 0.03rem;
				text-transform: uppercase;
				-webkit-font-smoothing: subpixel-antialiased;
				-moz-osx-font-smoothing: unset;
				display: table-cell;
				vertical-align: middle;
				text-align: left;
				overflow: hidden;
				opacity: 0;
				width: 0;
				height: 1.5rem;
				transform: scaleX(0);
				transition: width 0.2s 0.2s, opacity 0.2s, transform 0.2s;
				transform-origin: left;
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
				openModal(<TextEditor type={type}/>)
			}}>
			<SvgIcon icon={editorIcons.textWhite} />
			<div className='text'>
				<S value='ui.editor.text_preview.button'/>
			</div>
		</button>

	</div>

VisualToTextEditor.propTypes = {
	VisualEditor : PropTypes.func,
	openModal    : PropTypes.func,
	type         : PropTypes.string,
}

export default VisualToTextEditor
