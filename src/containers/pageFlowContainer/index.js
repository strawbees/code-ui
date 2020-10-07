import { connect } from 'react-redux'
import SimulatorVMManager from 'src/simulator/containers/simulatorVMManager'
import VisualToTextEditorContainer from 'src/containers/visualToTextEditorContainer'
import FlowEditor from 'src/editors/flow'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageFlowContainer = (props) =>
	<>
		<SimulatorVMManager/>
		<VisualToTextEditorContainer
			VisualEditor={FlowEditor}
			type='flow'
			{...props}
		/>
	</>

const pageFlowContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageFlowContainer)

export default pageFlowContainerConnected
