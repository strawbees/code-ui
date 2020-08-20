import { createSelector } from 'reselect'
import displayAdvancedNodesSelector from 'src/editors/flow/selectors/displayAdvancedNodesSelector'
import categoryNodesSelector from 'src/editors/flow/selectors/categoryNodesSelector'

const selector = () => createSelector(
	[
		displayAdvancedNodesSelector(),
		categoryNodesSelector(),
	],
	(
		displayAdvancedNodes,
		categoryNodes
	) => categoryNodes
		.filter(node => {
			if (displayAdvancedNodes) {
				return true
			}
			return !node.taxonomy.advanced
		})
		.map(node => node.id)
)

export default selector
