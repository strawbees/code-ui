import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Dialog from 'src/components/dialog'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const DialogContainer = (props) =>
	<Dialog {...props}/>

DialogContainer.propTypes = {
	cancelLabelKey  : PropTypes.string,
	confirmLabelKey : PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(DialogContainer)
