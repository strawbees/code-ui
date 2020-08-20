import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'

const selector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeIconSelector()(state, { id })
)

export default selector
