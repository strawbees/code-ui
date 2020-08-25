import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeCodeNameSelector from 'src/editors/flow/selectors/nodeCodeNameSelector'

const instanceNodeCodeNameSelector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeCodeNameSelector()(state, { id })
)

export default instanceNodeCodeNameSelector
