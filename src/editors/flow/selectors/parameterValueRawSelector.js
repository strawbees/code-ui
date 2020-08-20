import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import propsInstanceIdSelector from 'src/editors/flow/selectors/propsInstanceIdSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

const parameterValueRawSelector = () => createSelector(
	[
		stateSelector(),
		propsIdSelector(),
		propsInstanceIdSelector()
	],
	(
		state,
		id,
		instanceId
	) => {
		const instance = instanceSelector()(state, { id : instanceId })
		return instance.parameters && instance.parameters[id]
	}
)

export default parameterValueRawSelector
