import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

export default createSelector(
	[
		instanceSelector,
		state => state
	],
	(
		{ nodeId : id },
		state
	) => nodeDefinitionSelector(state, { id })
)
