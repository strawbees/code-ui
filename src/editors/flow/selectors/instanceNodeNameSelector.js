import { createSelector } from 'reselect'
import propsStateSelector from 'src/editors/flow/selectors/propsStateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'

export default () => createSelector(
	[
		instanceSelector(),
		propsStateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeNameSelector()(state, { id })
)
