import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { updateCurrentEditorProgramSource } from 'src/actions/editor'

const mapDispatchToProps = autobindDispatchToActionCreators({
	onSourceChange : updateCurrentEditorProgramSource,
})

export default mapDispatchToProps
