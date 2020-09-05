import { createStructuredSelector } from 'reselect'
import refEditorGeneratedSimulatorCodeSelector from 'src/selectors/refEditorGeneratedSimulatorCodeSelector'
import externalDataSelector from '../../selectors/externalDataSelector'

const mapStateToProps = () => createStructuredSelector({
	code                 : refEditorGeneratedSimulatorCodeSelector(),
	externalDataSelector : externalDataSelector()
})

export default mapStateToProps
