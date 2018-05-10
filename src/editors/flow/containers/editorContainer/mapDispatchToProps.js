import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setNodeDefinitions,
	setCategoryDefinitions,
	setSource,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	setNodeDefinitions,
	setCategoryDefinitions,
	setSource
})
