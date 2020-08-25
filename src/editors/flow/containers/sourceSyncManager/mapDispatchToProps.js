import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { setSource } from 'src/editors/flow/actions'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setSource,
	setRefEditorSource : updateCurrentEditorProgramSource,
})

export default mapDispatchToProps
