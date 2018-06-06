import { createSelector } from 'reselect'
import parameterValueRawSelector from 'src/editors/flow/selectors/parameterValueRawSelector'
import outletTransferDragMethodsSelector from 'src/editors/flow/selectors/outletTransferDragMethodsSelector'

export default () => createSelector(
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
