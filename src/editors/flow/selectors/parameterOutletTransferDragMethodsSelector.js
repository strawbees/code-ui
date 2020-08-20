import { createSelector } from 'reselect'
import parameterValueRawSelector from 'src/editors/flow/selectors/parameterValueRawSelector'
import outletTransferDragMethodsSelector from 'src/editors/flow/selectors/outletTransferDragMethodsSelector'

const selector = () => createSelector(
	[
		parameterValueRawSelector(),
		outletTransferDragMethodsSelector(),

	],
	(
		parameterValueRaw,
		outletTransferDragMethods,
	) =>
		outletTransferDragMethods &&
		outletTransferDragMethods[parameterValueRaw]
)

export default selector
