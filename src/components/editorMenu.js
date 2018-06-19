import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import DropdownMenu from 'src/components/dropdownMenu'
import globe from 'src/assets/icons/general/globe.svg'
import { WHITE } from 'src/constants/colors'

const EditorMenu = ({
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
			.root :global(> .dropdownMenu) {
				height: 100%;
			}
			.main {
				flex: 1;
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;
				justify-content: center;
			}
			.main :global(> *) {
				margin-right: 0.5rem;
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
			}
			.name:focus {
				outline: none;
				background-color: ${tinycolor(WHITE).toRgbString()};
			}
		`}</style>
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
		<div className='main'>
			<input
				className='name'
				type='text'
				value={name}
				placeholder={placeholderName}
				onChange={e => onNameChange(e.target.value)}
			/>
			{!saved &&
				<IconButton
					icon={globe}
					labelKey='ui.editor.save'
					onClick={onSavePress}
					hideLabelOnSmallScreen={true}
				/>
			}
			<IconButton
				icon={globe}
				labelKey='ui.editor.upload'
				onClick={onUploadPress}
				hideLabelOnSmallScreen={true}
			/>
		</div>
	</div>

EditorMenu.defaultProps = {}

EditorMenu.propTypes = {
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
