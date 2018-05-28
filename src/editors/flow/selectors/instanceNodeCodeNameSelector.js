import { createSelector } from 'reselect'
import propsStateSelector from 'src/editors/flow/selectors/propsStateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeCodeNameSelector from 'src/editors/flow/selectors/nodeCodeNameSelector'

export default () => createSelector(
	[
		instanceSelector(),
		propsStateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeCodeNameSelector()(state, { id })
)
