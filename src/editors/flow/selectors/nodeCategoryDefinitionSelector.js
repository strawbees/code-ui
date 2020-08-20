import { createSelector } from 'reselect'
import baseCategoryDefinitionsSelector from 'src/editors/flow/selectors/baseCategoryDefinitionsSelector'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

const selector = () => createSelector(
	[
		baseCategoryDefinitionsSelector(),
		nodeDefinitionSelector(),
	],
	(
		categoryDefinitions,
		nodeDefinition
	) => categoryDefinitions[nodeDefinition.taxonomy.category]
)

export default selector
