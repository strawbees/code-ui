import { createSelector } from 'reselect'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

export default createSelector(
	[
		nodeDefinitionSelector
	],
	(
		nodeDefinition
	) => nodeDefinition.code
)
