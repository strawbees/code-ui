import PropTypes from 'prop-types'

const SingleBoardStatus = ({
	status
}) =>
	<div className={`root singleBoardStatus ${status}`}>
		<style jsx>{`
			.root {
			}
		`}</style>
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
