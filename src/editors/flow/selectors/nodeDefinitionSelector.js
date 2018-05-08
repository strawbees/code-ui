import { createSelector } from 'reselect'
import nodeDefinitionsSelector from 'src/editors/flow/selectors/nodeDefinitionsSelector'

export default createSelector(
	[
		nodeDefinitionsSelector,
		(state, { id }) => id
	],
	(
		nodeDefinitions,
		id
	) => nodeDefinitions[id]
)
