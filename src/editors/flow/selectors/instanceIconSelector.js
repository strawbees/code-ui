import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'

export default createSelector(
	[
		instanceSelector,
		state => state
	],
	(
		{ nodeId : id },
		state
	) => nodeIconSelector(state, { id })
)
