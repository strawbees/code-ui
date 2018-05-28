import { createSelector } from 'reselect'
import displayAdvancedNodesSelector from 'src/editors/flow/selectors/displayAdvancedNodesSelector'
import categoryIdsSelector from 'src/editors/flow/selectors/categoryIdsSelector'

export default () => createSelector(
	[
		displayAdvancedNodesSelector(),
		categoryIdsSelector(),
	],
	(
		displayAdvancedNodes,
		categoryIds,
	) => ({
		displayAdvancedNodes,
		categoryIds,
	})
)
