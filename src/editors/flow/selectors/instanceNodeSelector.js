import { createSelector } from 'reselect'
import propsStateSelector from 'src/editors/flow/selectors/propsStateSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

export default () => createSelector(
	[
		instanceSelector(),
		propsStateSelector(),
	],
	(
		{ nodeId : id },
		state
	) => nodeDefinitionSelector()(state, { id })
)
