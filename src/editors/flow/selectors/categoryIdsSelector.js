import { createSelector } from 'reselect'
import categoryDefinitionsSelector from 'src/editors/flow/selectors/categoryDefinitionsSelector'

export default createSelector(
	[
		categoryDefinitionsSelector
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
