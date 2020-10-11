import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextOnlyEditor from 'src/components/textOnlyEditor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const TextOnlyEditorContainer = (props) =>
	<TextOnlyEditor
		{...props}
	/>

TextOnlyEditorContainer.propTypes = {
	VisualEditor : PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.object,
	]),
}

const visualToTextEditorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(TextOnlyEditorContainer)

export default visualToTextEditorContainerConnected
