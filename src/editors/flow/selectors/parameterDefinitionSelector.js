import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import propsInstanceIdSelector from 'src/editors/flow/selectors/propsInstanceIdSelector'
import instanceParametersSelector from 'src/editors/flow/selectors/instanceParametersSelector'

export default () => createSelector(
	[
		propsIdSelector(),
		propsInstanceIdSelector(),
		stateSelector(),
	],
	(
		id,
		instanceId,
		state
	) => instanceParametersSelector()(state, { id : instanceId })
		.filter(parameter => parameter.id === id)
		.pop()
)
