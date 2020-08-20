import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeParametersSelector from 'src/editors/flow/selectors/nodeParametersSelector'

const instanceParametersSelector = () => createSelector(
	[
		instanceSelector(),
		stateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeParametersSelector()(state, { id })
)

export default instanceParametersSelector
