import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import DropdownMenu from 'src/components/dropdownMenu'
import SvgIcon from 'src/components/svgIcon'
import saveIcon from 'src/assets/icons/file/save.svg'
import uploadIcon from 'src/assets/icons/file/upload.svg'
import editorIcons from 'src/assets/icons/editors/small'
import { WHITE } from 'src/constants/colors'

const EditorMenu = ({
	type,
	name,
	saved,
	placeholderName,
	onNameChange,
	onNewPress,
	onSavePress,
	onDuplicatePress,
	onSharePress,
	onExportPress,
	onImportPress,
	onUploadPress
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
			@media (max-width: 600px){
				.buttons {
					display: none;
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
					labelKey : 'ui.editor.file.new',
					onClick  : onNewPress
				},
				{
					labelKey : 'ui.editor.file.upload',
					onClick  : onUploadPress
				},
				{
					labelKey         : 'ui.editor.file.save',
					disabledLabelKey : 'ui.editor.file.autosaved',
					onClick          : onSavePress,
					disabled         : saved
				},
				{
					labelKey : 'ui.editor.file.duplicate',
					onClick  : onDuplicatePress,
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
			placeholder={placeholderName}
			onChange={e => onNameChange(e.target.value)}
		/>
		<div className='buttons'>
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
	type             : PropTypes.string,
	name             : PropTypes.string,
	saved            : PropTypes.bool,
	placeholderName  : PropTypes.string,
	onNameChange     : PropTypes.func,
	onNewPress       : PropTypes.func,
	onSavePress      : PropTypes.func,
	onDuplicatePress : PropTypes.func,
	onSharePress     : PropTypes.func,
	onExportPress    : PropTypes.func,
	onImportPress    : PropTypes.func,
	onUploadPress    : PropTypes.func,
}

export default EditorMenu
