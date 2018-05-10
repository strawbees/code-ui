import { createSelector } from 'reselect'
import baseNodeDefinitionsSelector from 'src/editors/flow/selectors/baseNodeDefinitionsSelector'

export default createSelector(
	[
		baseNodeDefinitionsSelector,
		(state, { id }) => id
	],
	(
		nodeDefinitions,
		id
	) => nodeDefinitions[id]
)
