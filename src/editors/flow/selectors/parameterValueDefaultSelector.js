import { createSelector } from 'reselect'
import parameterDefinitionSelector from 'src/editors/flow/selectors/parameterDefinitionSelector'

const parameterValueDefaultSelector = () => createSelector(
	[
		parameterDefinitionSelector(),
	],
	(
		parameterDefinition,
	) => parameterDefinition
		&& parameterDefinition.default
)

export default parameterValueDefaultSelector
