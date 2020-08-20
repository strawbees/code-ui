import { createSelector } from 'reselect'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'

const selector = () => createSelector(
	[
		parameterValueParsedSanitisedSelector(),
	],
	(
		{
			code
		}
	) => code
)

export default selector
