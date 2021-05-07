import PropTypes from 'prop-types'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import SingleBoardStatusContainer from 'src/containers/singleBoardStatusContainer'
import { fireGlobalEvent } from 'src/utils/globalEvents'

import {
	WHITE,
} from 'src/constants/colors'

const BoardsStatus = ({
	openUploaderDependencies,
	available,
	allowed,
	ready,
	boards,
	scale,
}) => {
	const onOpenUploaderDependencies = () => {
		openUploaderDependencies()
		let label
		if (!available) {
			label = 'not available'
		} else if (available && !allowed) {
			label = 'not allowed'
		} else if (available && !ready) {
			label = 'not ready'
		} else if (available && ready && boards.length > 0) {
			label = 'ready'
		} else if (available && ready && boards.length === 0) {
			label = 'no boards'
		}
		fireGlobalEvent('track-event', {
			category : 'ui',
			action   : 'open uploader dependencies',
			label,
		})
	}
	return (
		<div className='root boardsStatus'>
			<style jsx>{`
				.root {
					display: flex;
					flex-direction: row;
				}
				.button:hover {
					cursor: pointer;
				}
				.button:focus {
					outline: none;
				}
				.button:hover :global(>.singleBoardStatus .text),
				.button:focus :global(>.singleBoardStatus .text) {
					background-color: ${WHITE};
				}
			`}</style>
			<div className='button'
				tabIndex='0'
				role='button'
				onClick={onOpenUploaderDependencies}
				onKeyUp={({ key }) => {
					if (key === 'Enter') {
						onOpenUploaderDependencies()
					}
				}}>
				{!available &&
					<SingleBoardStatus
						scale={scale}
						status='notAvailable'
					/>
				}
				{available && !allowed && !ready &&
					<SingleBoardStatus
						scale={scale}
						status='notAllowed'
					/>
				}
				{available && allowed && !ready &&
					<SingleBoardStatus
						scale={scale}
						status='notReady'
					/>
				}
				{available && allowed && ready && boards.length > 0 && boards.map(runtimeId =>
					<SingleBoardStatusContainer
						key={runtimeId}
						runtimeId={runtimeId}
						scale={scale}
					/>
				)}
				{available && allowed && ready && boards.length === 0 &&
					<SingleBoardStatus
						scale={scale}
						status='notConnected'
					/>
				}
			</div>
		</div>
	)
}

BoardsStatus.defaultProps = {
	boards : [],
}

BoardsStatus.propTypes = {
	openUploaderDependencies : PropTypes.func,
	available                : PropTypes.bool,
	allowed                  : PropTypes.bool,
	ready                    : PropTypes.bool,
	boards                   : PropTypes.arrayOf(PropTypes.string),
	scale                    : PropTypes.number,
}

export default BoardsStatus
