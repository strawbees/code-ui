import { createSelector } from 'reselect'
import categoryDefinitionSelector from 'src/editors/flow/selectors/categoryDefinitionSelector'
import baseNodeDefinitionsSelector from 'src/editors/flow/selectors/baseNodeDefinitionsSelector'

export default createSelector(
	[
		categoryDefinitionSelector,
		baseNodeDefinitionsSelector
	],
	(
		categoryDefinition,
		nodeDefinitions,
	) => Object.values(nodeDefinitions)
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
)
