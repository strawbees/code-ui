import { createSelector } from 'reselect'
import baseCategoryDefinitionsSelector from 'src/editors/flow/selectors/baseCategoryDefinitionsSelector'

const categoryIdsSelector = () => createSelector(
	[
		baseCategoryDefinitionsSelector(),
	],
	(
		categoryDefinitions
	) => Object.keys(categoryDefinitions).sort((a, b) => {
		if (categoryDefinitions[a].index < categoryDefinitions[b].index) {
			return -1
		}
		if (categoryDefinitions[a].index > categoryDefinitions[b].index) {
			return 1
		}
		return 0
	})
)

export default categoryIdsSelector
