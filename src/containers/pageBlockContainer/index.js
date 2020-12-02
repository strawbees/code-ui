import { connect } from 'react-redux'
import EditorWithSimulatorContainer from 'src/containers/editorWithSimulatorContainer'
import VisualToTextEditorContainer from 'src/containers/visualToTextEditorContainer'
import BlockEditor from 'src/editors/block'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageHomeContainer = (props) =>
	<EditorWithSimulatorContainer>
		<VisualToTextEditorContainer
			VisualEditor={BlockEditor}
			type='block'
			{...props}
		/>
	</EditorWithSimulatorContainer>

const pageBlockContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageHomeContainer)

export default pageBlockContainerConnected
