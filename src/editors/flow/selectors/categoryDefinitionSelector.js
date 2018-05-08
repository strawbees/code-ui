import { createSelector } from 'reselect'
import categoryDefinitionsSelector from 'src/editors/flow/selectors/categoryDefinitionsSelector'

export default createSelector(
	[
		categoryDefinitionsSelector,
		(state, { id }) => id
	],
	(
		categoryDefinitions,
		id
	) => categoryDefinitions[id]
)
