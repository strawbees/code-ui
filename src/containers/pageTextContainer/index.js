import { connect } from 'react-redux'
import EditorWithSimulatorContainer from 'src/containers/editorWithSimulatorContainer'
import TextOnlyEditorContainer from 'src/containers/textOnlyEditorContainer'
import TextEditor from 'src/editors/text'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageTextContainer = (props) =>
	<EditorWithSimulatorContainer>
		<TextOnlyEditorContainer
			TextEditor={TextEditor}
			type='flow'
			{...props}
		/>
	</EditorWithSimulatorContainer>

const pageTextContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageTextContainer)

export default pageTextContainerConnected
