import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SingleBoardStatusContainer = props =>
	<SingleBoardStatus {...props} />

SingleBoardStatusContainer.propTypes = {
	runtimeId : PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SingleBoardStatusContainer)
