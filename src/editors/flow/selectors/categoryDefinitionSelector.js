import { createSelector } from 'reselect'
import baseCategoryDefinitionsSelector from 'src/editors/flow/selectors/baseCategoryDefinitionsSelector'

export default createSelector(
	[
		baseCategoryDefinitionsSelector,
		(state, { id }) => id
	],
	(
		categoryDefinitions,
		id
	) => categoryDefinitions[id]
)
