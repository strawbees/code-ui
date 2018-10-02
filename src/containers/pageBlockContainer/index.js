import { connect } from 'react-redux'
import VisualToTextEditorContainer from 'src/containers/visualToTextEditorContainer'
import BlockEditor from 'src/editors/block'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageHomeContainer = (props) =>
	<VisualToTextEditorContainer
		VisualEditor={BlockEditor}
		type='block'
		{...props}
	/>


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageHomeContainer)
