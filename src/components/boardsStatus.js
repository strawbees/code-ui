import PropTypes from 'prop-types'
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
			<div className="not-connected">
				not-connected
			</div>
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
