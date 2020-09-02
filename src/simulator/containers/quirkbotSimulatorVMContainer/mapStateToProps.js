import { createStructuredSelector } from 'reselect'
import refEditorGeneratedSimulatorCodeSelector from 'src/selectors/refEditorGeneratedSimulatorCodeSelector'

const mapStateToProps = () => createStructuredSelector({
	code : refEditorGeneratedSimulatorCodeSelector(),
})

export default mapStateToProps
