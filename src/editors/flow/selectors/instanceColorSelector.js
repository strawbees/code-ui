import { createSelector } from 'reselect'
import propsStateSelector from 'src/editors/flow/selectors/propsStateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'

export default () => createSelector(
	[
		instanceSelector(),
		propsStateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeColorSelector()(state, { id })
)
