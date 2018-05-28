import { createSelector } from 'reselect'
import propsStateSelector from 'src/editors/flow/selectors/propsStateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'

export default () => createSelector(
	[
		instanceSelector(),
		propsStateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeIconSelector()(state, { id })
)
