import { createSelector } from 'reselect'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

const nodeOutletsSelector = () => createSelector(
	[
		nodeDefinitionSelector(),
	],
	(
		nodeDefinition
	) => nodeDefinition.outlets || []
)

export default nodeOutletsSelector
