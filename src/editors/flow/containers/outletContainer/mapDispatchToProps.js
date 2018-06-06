import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
})
