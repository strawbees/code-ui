import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SingleBoardUploader from 'src/components/singleBoardUploader'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const SingleBoardUploaderContainer = props =>
	<SingleBoardUploader {...props} />

SingleBoardUploaderContainer.propTypes = {
	runtimeId : PropTypes.string,
	hex       : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SingleBoardUploader)
