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
	hexes     : PropTypes.arrayOf(PropTypes.string),
}

const singleBoardUploaderContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(SingleBoardUploader)

export default singleBoardUploaderContainerConnected
