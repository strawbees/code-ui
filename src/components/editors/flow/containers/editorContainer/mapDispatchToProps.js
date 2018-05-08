import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setFlowEditorNodeDefinitions,
	setFlowEditorCategoryDefinitions,
} from 'src/actions/flowEditor'

export default autobindDispatchToActionCreators({
	setFlowEditorNodeDefinitions,
	setFlowEditorCategoryDefinitions,
})
