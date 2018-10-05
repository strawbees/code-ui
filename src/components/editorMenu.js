import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import DropdownMenu from 'src/components/dropdownMenu'
import HelpMenuContainer from 'src/containers/helpMenuContainer'
import IconButton from 'src/components/iconButton'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'
import checkIcon from 'src/assets/icons/general/check.svg'
import syncIcon from 'src/assets/icons/general/sync.svg'
import fileIcons from 'src/assets/icons/file'
import editorIcons from 'src/assets/icons/editors/small'
import saveIcon from 'src/assets/icons/file/save.svg'
import uploadIcon from 'src/assets/icons/file/upload.svg'
import {
	ERROR,
	NEEDS_SYNC,
	READY,
	SYNCING,
} from 'src/constants/storage'

import {
	BLACK,
	GRAY,
	GREEN,
	WHITE,
	YELLOW,
} from 'src/constants/colors'

const EditorMenu = ({
	disabled,
	type,
	name,
	saved,
	placeholderName,
	onNameChange,
	onSavePress,
	onDuplicatePress,
	onSharePress,
	storageStatus,
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
				margin-right: 0.3rem;
			}
			.buttons {
				margin-right: 0;
			}

			.root :global(> .dropdownMenu) {
				height: 100%;
			}
			.type {
				margin-right: -2.5rem;
			}
			.type :global(>.svgIcon) {
				width: 2.25rem;
				height: 1.5rem;
			}
			.name {
				-webkit-appearance: none;
				border: none;
				border-radius: 0.2rem;
				background-color: ${tinycolor(WHITE).setAlpha(0.5).toRgbString()};
				font-size: 1rem;
				font-family: Text;
				padding: 0 0.2rem 0 2.75rem;
				max-width: 15rem;
				height: 2rem;
				margin-right: 0.5rem;
			}
			.name:focus {
				outline: none;
				background-color: ${tinycolor(WHITE).toRgbString()};
			}
			.name::placeholder {
				color: ${tinycolor(GRAY).darken(30).toRgbString()};
			}
			.name:focus::placeholder {
				opacity: 0.2;
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
			.saved-status.SYNCING .circle,
			.saved-status.NEEDS_SYNC .circle {
				background-color: ${tinycolor(YELLOW).toRgbString()};
			}
			.saved-status.SYNCING .circle :global(.svgIcon),
			.saved-status.NEEDS_SYNC .circle :global(.svgIcon) {
				fill: ${tinycolor(BLACK).toRgbString()};
				animation: spin-animation 2s linear infinite reverse;
			}
			@keyframes spin-animation {
				from {
					transform: rotateZ(0);
				}
				to {
					transform: rotateZ(360deg);
				}
			}
			@media (max-width: 850px){
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
				.name {
					padding: 0 0.2rem;
				}

			}
			@media (max-width: 450px){
				.name {
					flex: 1;
					width: 5rem;
				}
			}
			@media (max-width: 450px){
				.root :global(>*),
				.buttons :global(>*) {
					margin-right: 0.25rem;
				}
				.root :global(.dropdownMenu) {
					margin-right: 0;
				}
			}

		`}</style>
		{/* <div className='type'>
			<SvgIcon
				icon={editorIcons[type]}
			/>
		</div> */}
		<DropdownMenu
			labelKey='ui.file_menu.title'
			options={[
				{
					icon     : editorIcons.flow,
					labelKey : 'ui.file_menu.options.new_flow',
					link     : newFlowProgramUrl
				},
				{
					icon     : editorIcons.block,
					labelKey : 'ui.file_menu.options.new_block',
					link     : newBlockProgramUrl
				},
				{
					icon     : editorIcons.text,
					labelKey : 'ui.file_menu.options.new_text',
					link     : newTextProgramUrl
				},
				{
					labelKey         : 'ui.file_menu.options.save',
					disabledLabelKey : disabled ? 'ui.file_menu.options.save' : 'ui.file_menu.options.autosaved',
					onClick          : onSavePress,
					disabled         : disabled || saved,
					divider          : true,
					// icon             : fileIcons.save,
				},
				{
					labelKey : 'ui.file_menu.options.duplicate',
					onClick  : onDuplicatePress,
					// icon     : fileIcons.duplicate,
					disabled,
				},
				{
					labelKey : 'ui.file_menu.options.upload',
					onClick  : onUploadPress,
					// icon     : fileIcons.upload,
					disabled,
				},
				{
					labelKey : 'ui.file_menu.options.share',
					onClick  : onSharePress,
					divider  : true,
					// icon     : fileIcons.share,
					disabled,
				},
				{
					labelKey : 'ui.file_menu.options.export',
					onClick  : onExportPress,
					// icon     : fileIcons.export,
					disabled,
				},
				{
					labelKey : 'ui.file_menu.options.import',
					onClick  : onImportPress,
					// icon     : fileIcons.import,
				},
			]}
		/>
		<HelpMenuContainer />
		{!disabled &&
			<>
				<div className='type'>
					<SvgIcon
						icon={editorIcons[type]}
					/>
				</div>
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
						<div className={`saved-status ${storageStatus}`}>
							<div className='circle'>
								<SvgIcon
									icon={(
										storageStatus === SYNCING ||
										storageStatus === NEEDS_SYNC) ?
										syncIcon
										:
										checkIcon
									}
								/>
							</div>
							<div className='label'>
								<S value='ui.file_menu.options.autosaved'/>
							</div>
						</div>
					}
					{!saved &&
						<IconButton
							icon={saveIcon}
							labelKey='ui.header_menu.options.save'
							onClick={onSavePress}
							hideLabelOnMediaQuery={'max-width: 950px'}
						/>
					}
					<IconButton
						icon={uploadIcon}
						labelKey='ui.header_menu.options.upload'
						onClick={onUploadPress}
						hideLabelOnMediaQuery={'max-width: 950px'}
					/>
				</div>
			</>
		}
	</div>

EditorMenu.defaultProps = {}

EditorMenu.propTypes = {
	disabled        : PropTypes.bool,
	type            : PropTypes.string,
	name            : PropTypes.string,
	saved           : PropTypes.bool,
	placeholderName : PropTypes.string,
	storageStatus   : PropTypes.oneOf([
		NEEDS_SYNC,
		SYNCING,
		READY,
		ERROR
	]),
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
