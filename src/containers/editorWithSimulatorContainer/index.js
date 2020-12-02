import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import EditorWithSimulator from 'src/components/editorWithSimulator'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const EditorWithSimulatorContainer = (props) =>
	<EditorWithSimulator
		{...props}
	/>

EditorWithSimulatorContainer.propTypes = {
	VisualEditor : PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.object,
	]),
}

const editorWithSimulatorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorWithSimulatorContainer)

export default editorWithSimulatorContainerConnected
