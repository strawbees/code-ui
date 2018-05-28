import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import baseCategoryDefinitionsSelector from 'src/editors/flow/selectors/baseCategoryDefinitionsSelector'

export default createSelector(
	[
		baseCategoryDefinitionsSelector,
		propsIdSelector,
	],
	(
		categoryDefinitions,
		id,
	) => categoryDefinitions[id]
)
