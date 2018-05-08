import { createSelector } from 'reselect'
import displayAdvancedNodesSelector from 'src/components/editors/flow/selectors/displayAdvancedNodesSelector'
import categoryIdsSelector from 'src/components/editors/flow/selectors/categoryIdsSelector'

export default createSelector(
	[
		displayAdvancedNodesSelector,
		categoryIdsSelector,
	],
	(
		displayAdvancedNodes,
		categoryIds,
	) => ({
		displayAdvancedNodes,
		categoryIds,
	})
)
