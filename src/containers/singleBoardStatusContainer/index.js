import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SingleBoardStatusContainer = props => <SingleBoardStatus {...props} />

SingleBoardStatusContainer.propTypes = {
	runtimeId : PropTypes.string,
	scale     : PropTypes.number,
	labelKey  : PropTypes.string,
}

const singleBoardStatusContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SingleBoardStatusContainer)

export default singleBoardStatusContainerConnected
