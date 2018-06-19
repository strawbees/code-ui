import PropTypes from 'prop-types'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import SingleBoardStatusContainer from 'src/containers/singleBoardStatusContainer'

const BoardsStatus = ({
	boards
}) =>
	<div className='root boardsStatus'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
			}
		`}</style>
		{boards.length === 0 &&
			<SingleBoardStatus
				status='notConnected'
			/>
		}
		{boards.length > 0 && boards.map(runtimeId =>
			<SingleBoardStatusContainer
				key={runtimeId}
				runtimeId={runtimeId}
			/>
		)}
	</div>

BoardsStatus.defaultProps = {
	boards : []
}

BoardsStatus.propTypes = {
	boards : PropTypes.arrayOf(PropTypes.string)
}

export default BoardsStatus
