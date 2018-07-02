import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import OpenInTextEditorButton from 'src/components/openInTextEditorButton'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const OpenInTextEditorButtonContainer = (props) =>
	<OpenInTextEditorButton {...props} />

OpenInTextEditorButtonContainer.propTypes = {
	onClick : PropTypes.func,
}
export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(OpenInTextEditorButtonContainer)
