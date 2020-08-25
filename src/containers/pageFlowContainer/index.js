import { connect } from 'react-redux'
import VisualToTextEditorContainer from 'src/containers/visualToTextEditorContainer'
import FlowEditor from 'src/editors/flow'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageFlowContainer = (props) =>
	<VisualToTextEditorContainer
		VisualEditor={FlowEditor}
		type='flow'
		{...props}
	/>

const pageFlowContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageFlowContainer)

export default pageFlowContainerConnected
