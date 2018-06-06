import { createStructuredSelector } from 'reselect'
import parameterIsConnectedSelector from 'src/editors/flow/selectors/parameterIsConnectedSelector'
import parameterIsHighlightedSelector from 'src/editors/flow/selectors/parameterIsHighlightedSelector'
import parameterOutletTransferDragMethodsSelector from 'src/editors/flow/selectors/parameterOutletTransferDragMethodsSelector'
import isDraggingOutletSelector from 'src/editors/flow/selectors/isDraggingOutletSelector'

export default () => createStructuredSelector({
	connected                 : parameterIsConnectedSelector(),
	highlighted               : parameterIsHighlightedSelector(),
	recommeded                : isDraggingOutletSelector(),
	outletTransferDragMethods : parameterOutletTransferDragMethodsSelector()
})
