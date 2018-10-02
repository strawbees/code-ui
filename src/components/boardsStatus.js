import PropTypes from 'prop-types'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import SingleBoardStatusContainer from 'src/containers/singleBoardStatusContainer'
import {
	WHITE,
} from 'src/constants/colors'

const BoardsStatus = ({
	openUploaderDependencies,
	available,
	ready,
	boards,
	scale,
}) =>
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
			onClick={openUploaderDependencies}>
			{!available &&
				<SingleBoardStatus
					scale={scale}
					status='notAvailable'
				/>
			}
			{available && !ready &&
				<SingleBoardStatus
					scale={scale}
					status='notReady'
				/>

			}
			{available && ready && boards.length > 0 && boards.map(runtimeId =>
				<SingleBoardStatusContainer
					key={runtimeId}
					runtimeId={runtimeId}
					scale={scale}
				/>
			)}
			{available && ready && boards.length === 0 &&
				<SingleBoardStatus
					scale={scale}
					status='notConnected'
				/>
			}
		</div>

	</div>

BoardsStatus.defaultProps = {
	boards : [],
}

BoardsStatus.propTypes = {
	openUploaderDependencies : PropTypes.func,
	available                : PropTypes.bool,
	ready                    : PropTypes.bool,
	boards                   : PropTypes.arrayOf(PropTypes.string),
	scale                    : PropTypes.number,
}

export default BoardsStatus
