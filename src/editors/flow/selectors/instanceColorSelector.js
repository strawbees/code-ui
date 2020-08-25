import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'

const instanceColorSelector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeColorSelector()(state, { id })
)

export default instanceColorSelector
