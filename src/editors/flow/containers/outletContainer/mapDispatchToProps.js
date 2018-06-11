import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
	setActiveOutletLineRects,
	setOutletTransferDragMethods,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
	setActiveOutletLineRects,
	setOutletTransferDragMethods,
})
