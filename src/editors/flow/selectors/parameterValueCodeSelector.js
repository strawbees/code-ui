import { createSelector } from 'reselect'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'

const parameterValueCodeSelector = () => createSelector(
	[
		parameterValueParsedSanitisedSelector(),
	],
	(
		{
			code
		}
	) => code
)

export default parameterValueCodeSelector
