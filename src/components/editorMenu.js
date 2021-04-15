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
import editorIcons from 'src/assets/icons/editors/small'
import saveIcon from 'src/assets/icons/file/save.svg'
import uploadIcon from 'src/assets/icons/file/upload.svg'
import { fireGlobalEvent } from 'src/utils/globalEvents'

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
	onUploadFactoryCodePress,
	onUploadBootloaderUpdateCodePress,
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
					link     : newFlowProgramUrl,
					onClick  : () => fireGlobalEvent('track-event', {
						category : 'ui',
						action   : 'new flow program',
						label    : 'file menu'
					}),
				},
				{
					icon     : editorIcons.block,
					labelKey : 'ui.file_menu.options.new_block',
					link     : newBlockProgramUrl,
					onClick  : () => fireGlobalEvent('track-event', {
						category : 'ui',
						action   : 'new block program',
						label    : 'file menu'
					}),
				},
				{
					icon     : editorIcons.text,
					labelKey : 'ui.file_menu.options.new_text',
					link     : newTextProgramUrl,
					onClick  : () => fireGlobalEvent('track-event', {
						category : 'ui',
						action   : 'new text program',
						label    : 'file menu'
					}),
				},
				{
					labelKey         : 'ui.file_menu.options.save',
					disabledLabelKey : disabled ? 'ui.file_menu.options.save' : 'ui.file_menu.options.autosaved',
					disabled         : disabled || saved,
					divider          : true,
					// icon             : fileIcons.save,
					onClick          : () => {
						onSavePress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'save program',
							label    : 'file menu'
						})
					},
				},
				{
					disabled,
					labelKey : 'ui.file_menu.options.duplicate',
					// icon  : fileIcons.duplicate,
					onClick  : () => {
						onDuplicatePress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'duplicate program',
							label    : 'file menu'
						})
					},
				},
				{
					disabled,
					labelKey : 'ui.file_menu.options.upload',
					// icon  : fileIcons.upload,
					onClick  : () => {
						onUploadPress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'upload program',
							label    : 'file menu'
						})
					},
				},
				{
					disabled,
					labelKey : 'ui.file_menu.options.share',
					divider  : true,
					// icon  : fileIcons.share,
					onClick  : () => {
						onSharePress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'share program',
							label    : 'file menu'
						})
					},
				},
				{
					disabled,
					labelKey : 'ui.file_menu.options.export',
					// icon  : fileIcons.export,
					onClick  : () => {
						onExportPress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'export program',
							label    : 'file menu'
						})
					},
				},
				{
					labelKey : 'ui.file_menu.options.import',
					// icon  : fileIcons.import,
					onClick  : () => {
						onImportPress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'import program',
							label    : 'file menu'
						})
					},
				},
				{
					labelKey : 'ui.file_menu.options.upload-factory',
					divider  : true,
					onClick  : () => {
						onUploadFactoryCodePress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'upload factory program',
							label    : 'file menu'
						})
					},
				},
				{
					labelKey : 'ui.file_menu.options.upload-bootloader-updater',
					onClick  : () => {
						onUploadBootloaderUpdateCodePress()
						fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'upload bootloader update program',
							label    : 'file menu'
						})
					},
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
							onClick={() => {
								onSavePress()
								fireGlobalEvent('track-event', {
									category : 'ui',
									action   : 'save program',
									label    : 'header'
								})
							}}
							hideLabelOnMediaQuery={'max-width: 950px'}
						/>
					}
					<IconButton
						icon={uploadIcon}
						labelKey='ui.header_menu.options.upload'
						onClick={() => {
							onUploadPress()
							fireGlobalEvent('track-event', {
								category : 'ui',
								action   : 'upload program',
								label    : 'header'
							})
						}}
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
	onNameChange                      : PropTypes.func,
	onSavePress                       : PropTypes.func,
	onDuplicatePress                  : PropTypes.func,
	onSharePress                      : PropTypes.func,
	onExportPress                     : PropTypes.func,
	onImportPress                     : PropTypes.func,
	onUploadPress                     : PropTypes.func,
	onUploadFactoryCodePress          : PropTypes.func,
	onUploadBootloaderUpdateCodePress : PropTypes.func,
	newFlowProgramUrl                 : PropTypes.string,
	newBlockProgramUrl                : PropTypes.string,
	newTextProgramUrl                 : PropTypes.string,
}

export default EditorMenu
