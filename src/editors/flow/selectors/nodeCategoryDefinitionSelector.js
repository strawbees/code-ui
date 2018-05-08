import { createSelector } from 'reselect'
import categoryDefinitionsSelector from 'src/editors/flow/selectors/categoryDefinitionsSelector'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

export default createSelector(
	[
		categoryDefinitionsSelector,
		nodeDefinitionSelector,
	],
	(
		categoryDefinitions,
		nodeDefinition
	) => categoryDefinitions[nodeDefinition.taxonomy.category]
)
