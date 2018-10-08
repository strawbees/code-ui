import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'src/components/iconButton'
import ProgramButton from 'src/components/programButton'
import ProgramMenu from 'src/components/programMenu'
import fileIcons from 'src/assets/icons/file'
import { fireGlobalEvent } from 'src/utils/globalEvents'

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
							onClick  : () => {
								onUploadPress()
								fireGlobalEvent('track-event', {
									category : 'ui',
									action   : 'upload program',
									label    : 'program menu'
								})
							},
						},
						onDuplicatePress && {
							icon     : fileIcons.duplicate,
							labelKey : 'ui.file_menu.options.duplicate',
							onClick  : () => {
								onDuplicatePress()
								fireGlobalEvent('track-event', {
									category : 'ui',
									action   : 'duplicate program',
									label    : 'program menu'
								})
							},
						},
						onSharePress && {
							icon     : fileIcons.share,
							labelKey : 'ui.file_menu.options.share',
							onClick  : () => {
								onSharePress()
								fireGlobalEvent('track-event', {
									category : 'ui',
									action   : 'share program',
									label    : 'program menu'
								})
							},
						},
						onExportPress && {
							icon     : fileIcons.export,
							labelKey : 'ui.file_menu.options.export',
							onClick  : () => {
								onExportPress()
								fireGlobalEvent('track-event', {
									category : 'ui',
									action   : 'export program',
									label    : 'program menu'
								})
							},
						},
						onRemovePress && {
							icon     : fileIcons.remove,
							labelKey : 'ui.file_menu.options.remove',
							onClick  : () => {
								onRemovePress()
								fireGlobalEvent('track-event', {
									category : 'ui',
									action   : 'remove program',
									label    : 'program menu'
								})
							},
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
