import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import DropdownMenu from 'src/components/dropdownMenu'
import IconButton from 'src/components/iconButton'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'
import checkIcon from 'src/assets/icons/general/check.svg'
import editorIcons from 'src/assets/icons/editors/small'
import saveIcon from 'src/assets/icons/file/save.svg'
import uploadIcon from 'src/assets/icons/file/upload.svg'

import {
	WHITE,
	GREEN,
} from 'src/constants/colors'

const EditorMenu = ({
	type,
	name,
	saved,
	placeholderName,
	onNameChange,
	onSavePress,
	onDuplicatePress,
	onSharePress,
	onExportPress,
	onImportPress,
	onUploadPress,
	newFlowProgramUrl,
	newBlockProgramUrl,
	newTextProgramUrl,
}) =>
	<div className='root editorMenu'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;
			}
			.root :global(>*),
			.buttons :global(>*) {
				margin-right: 0.5rem;
			}
			.buttons {
				margin-right: 0;
			}
			.type {
				margin-right: 0.5rem;
			}
			.type :global(>.svgIcon) {
				width: 3.5rem;
				height: 2.25rem;
			}
			.root :global(> .dropdownMenu) {
				height: 100%;
			}
			.name {
				-webkit-appearance: none;
				border: none;
				border-radius: 0.2rem;
				background-color: ${tinycolor(WHITE).setAlpha(0.5).toRgbString()};
				font-size: 1rem;
				font-family: Text;
				padding: 0 0.2rem;
				max-width: 15rem;
				height: 2rem;
				margin-right: 0.5rem;
			}
			.name:focus {
				outline: none;
				background-color: ${tinycolor(WHITE).toRgbString()};
			}
			.buttons {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.saved-status {
				display: flex;
				flex-direction: row;
				align-items: center;
				color: ${tinycolor(WHITE).toRgbString()};
				font-size: 0.8rem;
				-webkit-font-smoothing: subpixel-antialiased;
				-moz-osx-font-smoothing: unset;
			}
			.saved-status .circle {
				background-color: ${tinycolor(GREEN).toRgbString()};
				width: 1.5rem;
				height: 1.5rem;
				border-radius: 1.5rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-right: 0.25rem;
			}
			.saved-status .circle :global(.svgIcon) {
				fill: ${tinycolor(WHITE).toRgbString()};
				width: 1.5rem;
				height: 1.5rem;
			}
			@media (max-width: 800px){
				.saved-status .circle {
					margin-right: 0;
				}
				.saved-status .label {
					display: none;
				}
			}
			@media (max-width: 700px){
				.buttons {
					display: none;
				}
			}
			@media (max-width: 500px){
				.type {
					display: none;
				}
			}
			@media (max-width: 450px){
				.name {
					flex: 1;
					width: 5rem;
				}
			}
		`}</style>
		<div className='type'>
			<SvgIcon
				icon={editorIcons[type]}
			/>
		</div>
		<DropdownMenu
			labelKey='ui.editor.file.title'
			options={[
				{
					labelKey : 'ui.editor.file.new.flow',
					link     : newFlowProgramUrl
				},
				{
					labelKey : 'ui.editor.file.new.block',
					link     : newBlockProgramUrl
				},
				{
					labelKey : 'ui.editor.file.new.text',
					link     : newTextProgramUrl
				},
				{
					labelKey         : 'ui.editor.file.save',
					disabledLabelKey : 'ui.editor.file.autosaved',
					onClick          : onSavePress,
					disabled         : saved,
					divider          : true
				},
				{
					labelKey : 'ui.editor.file.duplicate',
					onClick  : onDuplicatePress,
				},
				{
					labelKey : 'ui.editor.file.upload',
					onClick  : onUploadPress,
				},
				{
					labelKey : 'ui.editor.file.share',
					onClick  : onSharePress,
					divider  : true
				},
				{
					labelKey : 'ui.editor.file.export',
					onClick  : onExportPress,
				},
				{
					labelKey : 'ui.editor.file.import',
					onClick  : onImportPress,
				},
			]}
		/>
		<input
			className='name'
			type='text'
			value={name}
			size={0}
			placeholder={placeholderName}
			onChange={e => onNameChange(e.target.value)}
		/>
		<div className='buttons'>
			{saved &&
				<div className='saved-status'>
					<div className='circle'>
						<SvgIcon
							icon={checkIcon}
						/>
					</div>
					<div className='label'>
						<S value='ui.editor.file.autosaved'/>
					</div>
				</div>
			}
			{!saved &&
				<IconButton
					icon={saveIcon}
					labelKey='ui.editor.save'
					onClick={onSavePress}
					hideLabelOnMediaQuery={'max-width: 800px'}
				/>
			}
			<IconButton
				icon={uploadIcon}
				labelKey='ui.editor.upload'
				onClick={onUploadPress}
				hideLabelOnMediaQuery={'max-width: 800px'}
			/>
		</div>
	</div>

EditorMenu.defaultProps = {}

EditorMenu.propTypes = {
	type               : PropTypes.string,
	name               : PropTypes.string,
	saved              : PropTypes.bool,
	placeholderName    : PropTypes.string,
	onNameChange       : PropTypes.func,
	onSavePress        : PropTypes.func,
	onDuplicatePress   : PropTypes.func,
	onSharePress       : PropTypes.func,
	onExportPress      : PropTypes.func,
	onImportPress      : PropTypes.func,
	onUploadPress      : PropTypes.func,
	newFlowProgramUrl  : PropTypes.string,
	newBlockProgramUrl : PropTypes.string,
	newTextProgramUrl  : PropTypes.string,
}

export default EditorMenu
