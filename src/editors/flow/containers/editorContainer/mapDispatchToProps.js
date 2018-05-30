import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setNodeDefinitions,
	setCategoryDefinitions,
	setConstantDefinitions,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	setNodeDefinitions,
	setCategoryDefinitions,
	setConstantDefinitions,
})
