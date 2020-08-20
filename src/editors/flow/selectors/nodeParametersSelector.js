import { createSelector } from 'reselect'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

const selector = () => createSelector(
	[
		nodeDefinitionSelector(),
	],
	(
		nodeDefinition
	) => nodeDefinition.parameters || []
)

export default selector
