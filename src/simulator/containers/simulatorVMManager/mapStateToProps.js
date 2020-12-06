import { createStructuredSelector } from 'reselect'
import rootPathSelector from 'src/selectors/rootPathSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import externalDataSelector from '../../selectors/externalDataSelector'

const mapStateToProps = () => createStructuredSelector({
	rootPath            : rootPathSelector(),
	code                : refEditorGeneratedCodeSelector(),
	externalData        : externalDataSelector(),
	simulatorSandboxUrl : makeStringSelector('routes.simulator-sandbox'),
})

export default mapStateToProps
