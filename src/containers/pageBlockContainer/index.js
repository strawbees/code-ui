import { connect } from 'react-redux'
import SimulatorVMManager from 'src/simulator/containers/simulatorVMManager'
import VisualToTextEditorContainer from 'src/containers/visualToTextEditorContainer'
import BlockEditor from 'src/editors/block'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageHomeContainer = (props) =>
	<>
		<SimulatorVMManager/>
		<VisualToTextEditorContainer
			VisualEditor={BlockEditor}
			type='block'
			{...props}
		/>
	</>

const pageBlockContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageHomeContainer)

export default pageBlockContainerConnected
