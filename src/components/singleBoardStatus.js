import PropTypes from 'prop-types'

const SingleBoardStatus = ({
	status
}) =>
	<div className={`root singleBoardStatus ${status}`}>
		{status}
	</div>

SingleBoardStatus.defaultProps = {
	status : 'busy'
}

SingleBoardStatus.propTypes = {
	id     : PropTypes.string,
	status : PropTypes.oneOf(['ok', 'busy', 'problem']),
}


export default SingleBoardStatus
