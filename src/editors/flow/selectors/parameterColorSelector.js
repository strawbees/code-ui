import { createSelector } from 'reselect'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import propsInstanceIdSelector from 'src/editors/flow/selectors/propsInstanceIdSelector'
import instanceColorSelector from 'src/editors/flow/selectors/instanceColorSelector'

const selector = () => createSelector(
	[
		stateSelector(),
		propsInstanceIdSelector()
	],
	(
		state,
		instanceId
	) => instanceColorSelector()(state, { id : instanceId })
)

export default selector
