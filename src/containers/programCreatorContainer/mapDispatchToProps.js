import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { createNewProgramByTypeAndGoToEditor } from 'src/actions/program'

export default autobindDispatchToActionCreators({
	createNewProgramByTypeAndGoToEditor,
})
