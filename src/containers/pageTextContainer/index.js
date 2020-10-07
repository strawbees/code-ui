import { connect } from 'react-redux'
import SimulatorVMManager from 'src/simulator/containers/simulatorVMManager'
import TextEditor from 'src/editors/text'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageTextContainer = (props) =>
	<>
		<SimulatorVMManager/>
		<TextEditor {...props}/>
	</>

const pageTextContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageTextContainer)

export default pageTextContainerConnected
