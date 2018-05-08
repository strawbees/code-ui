import { createSelector } from 'reselect'
import displayAdvancedNodesSelector from 'src/editors/flow/selectors/displayAdvancedNodesSelector'
import categoryDefinitionSelector from 'src/editors/flow/selectors/categoryDefinitionSelector'
import nodeDefinitionsSelector from 'src/editors/flow/selectors/nodeDefinitionsSelector'

export default createSelector(
	[
		displayAdvancedNodesSelector,
		categoryDefinitionSelector,
		nodeDefinitionsSelector
	],
	(
		displayAdvancedNodes,
		categoryDefinition,
		nodeDefinitions,
	) => Object.values(nodeDefinitions)
		.filter(node => {
			if (displayAdvancedNodes) {
				return true
			}
			return !node.taxonomy.advanced
		})
		.filter(node => node.taxonomy.category === categoryDefinition.id)
		.sort((a, b) => {
			if (a.index < b.index) {
				return -1
			}
			if (a.index > b.index) {
				return 1
			}
			return 0
		})
		.map(node => node.id)
)
