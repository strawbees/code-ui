import { connect } from 'react-redux'
import VisualToTextEditorContainer from 'src/containers/visualToTextEditorContainer'
import ScratchEditor from 'src/editors/scratch'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageHomeContainer = (props) =>
	<VisualToTextEditorContainer
		VisualEditor={ScratchEditor}
		{...props}
	/>


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageHomeContainer)
