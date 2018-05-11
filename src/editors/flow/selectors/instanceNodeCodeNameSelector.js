import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeCodeNameSelector from 'src/editors/flow/selectors/nodeCodeNameSelector'

export default createSelector(
	[
		instanceSelector,
		state => state
	],
	(
		{ nodeId : id },
		state
	) => nodeCodeNameSelector(state, { id })
)
