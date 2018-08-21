import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Link from 'src/components/link'
import IconButton from 'src/components/iconButton'
import ProgramTitle from 'src/components/programTitle'
import ProgramButton from 'src/components/programButton'
import fileIcons from 'src/assets/icons/file'
import { GRAY } from 'src/constants/colors'

const ProgramMenu = ({
	name,
	type,
	updatedAt,
	items,
}) =>
	<React.Fragment>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: stretch;
			}
			.container {
				margin-top: 0.5rem;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				padding: 0.5rem;
				border-radius: 0.5rem;
			}
			.container :global(.iconButton){
				margin-bottom: 0.5rem;
			}
			.container :global(.iconButton:last-child) {
				margin-bottom: 0;
			}
		`}</style>
		<ProgramTitle
			name={name}
			type={type}
			updatedAt={updatedAt}
			displayAsButton={false}
		/>
		<div className='container'>
			{items && items.filter(item => item).map(({ icon, labelKey, onClick }) =>
				<IconButton
					key={labelKey}
					icon={icon}
					labelKey={labelKey}
					onClick={onClick}
				/>
			)}
		</div>
	</React.Fragment>


const ProgramListItem = ({
	name,
	url,
	type,
	updatedAt,
	safeOpenModal,
	onRemovePress,
	onDuplicatePress,
	onSharePress,
	onUploadPress,
	onExportPress,
}) =>
	<div className='root programListItem'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root :global(>.programButton) {
				flex: 1;
				margin-right: 0.5rem;
			}
		`}</style>
		<ProgramButton
			url={url}
			name={name}
			type={type}
			updatedAt={updatedAt}
		/>
		<IconButton
			icon={fileIcons.menu}
			onClick={() => safeOpenModal(
				<ProgramMenu
					name={name}
					type={type}
					items={[
						onUploadPress && {
							icon     : fileIcons.upload,
							labelKey : 'ui.file_menu.options.upload',
							onClick  : onUploadPress,
						},
						onDuplicatePress && {
							icon     : fileIcons.duplicate,
							labelKey : 'ui.file_menu.options.duplicate',
							onClick  : onDuplicatePress,
						},
						onSharePress && {
							icon     : fileIcons.share,
							labelKey : 'ui.file_menu.options.share',
							onClick  : onSharePress,
						},
						onExportPress && {
							icon     : fileIcons.export,
							labelKey : 'ui.file_menu.options.export',
							onClick  : onExportPress,
						},
						onRemovePress && {
							icon     : fileIcons.remove,
							labelKey : 'ui.file_menu.options.remove',
							onClick  : onRemovePress,
						},
					]}
				/>
			)}
		/>
	</div>

ProgramListItem.defaultProps = {
}

ProgramListItem.propTypes = {
	name             : PropTypes.string,
	url              : PropTypes.string,
	type             : PropTypes.string,
	updatedAt        : PropTypes.string,
	safeOpenModal    : PropTypes.func,
	onEditPress      : PropTypes.func,
	onRemovePress    : PropTypes.func,
	onDuplicatePress : PropTypes.func,
	onSharePress     : PropTypes.func,
	onUploadPress    : PropTypes.func,
	onExportPress    : PropTypes.func,
}

export default ProgramListItem
