import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'

export default createSelector(
	[
		instanceSelector,
		state => state
	],
	(
		{ nodeId : id },
		state
	) => nodeNameSelector(state, { id })
)
