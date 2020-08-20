import { createSelector } from 'reselect'
import nodeDefinitionSelector from 'src/editors/flow/selectors/nodeDefinitionSelector'

const nodeCodeNameSelector = () => createSelector(
	[
		nodeDefinitionSelector(),
	],
	(
		nodeDefinition
	) => nodeDefinition.code
)

export default nodeCodeNameSelector
