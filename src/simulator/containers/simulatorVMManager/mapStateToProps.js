import { createStructuredSelector } from 'reselect'
import rootPathSelector from 'src/selectors/rootPathSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import refEditorGeneratedSimulatorCodeSelector from 'src/selectors/refEditorGeneratedSimulatorCodeSelector'
import externalDataSelector from '../../selectors/externalDataSelector'

const mapStateToProps = () => createStructuredSelector({
	rootPath     : rootPathSelector(),
	code         : refEditorGeneratedCodeSelector(),
	externalData : externalDataSelector()
})

export default mapStateToProps
