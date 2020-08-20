import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeOutletsSelector from 'src/editors/flow/selectors/nodeOutletsSelector'

const instanceOutletsSelector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeOutletsSelector()(state, { id })
)

export default instanceOutletsSelector
