import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import propsInstanceIdSelector from 'src/editors/flow/selectors/propsInstanceIdSelector'
import highlightedInstanceParameterSelector from 'src/editors/flow/selectors/highlightedInstanceParameterSelector'

export default () => createSelector(
	[
		propsIdSelector(),
		propsInstanceIdSelector(),
		highlightedInstanceParameterSelector(),

	],
	(
		id,
		instanceId,
		highlightedInstanceParameter,
	) =>
		highlightedInstanceParameter &&
		highlightedInstanceParameter.parameterId === id &&
		highlightedInstanceParameter.id === instanceId
)
