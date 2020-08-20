import { createSelector } from 'reselect'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

const selector = () => createSelector(
	[
		nodeDefinitionSelector(),
	],
	(
		nodeDefinition
	) => nodeDefinition.code
)

export default selector
