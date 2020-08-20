import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
	setActiveOutletLineRects,
	setOutletTransferDragMethods,
} from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
	setActiveOutletLineRects,
	setOutletTransferDragMethods,
})

export default mapDispatchToProps
