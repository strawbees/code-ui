import { createSelector } from 'reselect'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'

export default () => createSelector(
	[
		parameterValueParsedSanitisedSelector(),
	],
	(
		{
			code
		}
	) => code
)
