import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import VisualToTextEditor from 'src/components/visualToTextEditor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const VisualToTextEditorContainer = (props) =>
	<VisualToTextEditor
		{...props}
	/>

VisualToTextEditorContainer.propTypes = {
	VisualEditor : PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.object,
	]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(VisualToTextEditorContainer)
