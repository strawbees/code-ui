import { createSelector } from 'reselect'
import parameterDefinitionSelector from 'src/editors/flow/selectors/parameterDefinitionSelector'

const parameterIsMultipleSelector = () => createSelector(
	[
		parameterDefinitionSelector(),
	],
	(
		parameterDefinition,
	) => parameterDefinition.multiple
)

export default parameterIsMultipleSelector
