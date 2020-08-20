import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

const selector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeDefinitionSelector()(state, { id })
)

export default selector
