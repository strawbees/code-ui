import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'

const selector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeNameSelector()(state, { id })
)

export default selector
