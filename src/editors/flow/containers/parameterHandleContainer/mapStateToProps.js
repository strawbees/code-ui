import { createStructuredSelector } from 'reselect'
import parameterIsConnectedSelector from 'src/editors/flow/selectors/parameterIsConnectedSelector'
import parameterIsHighlightedSelector from 'src/editors/flow/selectors/parameterIsHighlightedSelector'
import parameterOutletTransferDragMethodsSelector from 'src/editors/flow/selectors/parameterOutletTransferDragMethodsSelector'
import isDraggingOutletSelector from 'src/editors/flow/selectors/isDraggingOutletSelector'

const mapStateToProps = () => createStructuredSelector({
	connected                 : parameterIsConnectedSelector(),
	highlighted               : parameterIsHighlightedSelector(),
	recommeded                : isDraggingOutletSelector(),
	outletTransferDragMethods : parameterOutletTransferDragMethodsSelector()
})

export default mapStateToProps
