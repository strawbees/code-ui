import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'

export default createSelector(
	[
		instanceSelector,
		state => state
	],
	(
		{ nodeId : id },
		state
	) => nodeColorSelector(state, { id })
)
