import { createSelector } from 'reselect'
import parameterDefinitionSelector from 'src/editors/flow/selectors/parameterDefinitionSelector'

const selector = () => createSelector(
	[
		parameterDefinitionSelector(),
	],
	(
		parameterDefinition,
	) => parameterDefinition.multiple
)

export default selector
