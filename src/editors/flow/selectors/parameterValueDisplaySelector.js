import { createSelector } from 'reselect'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'

const parameterValueDisplaySelector = () => createSelector(
	[
		parameterValueParsedSanitisedSelector(),
	],
	(
		{
			type,
			display : text,
			icon,
		}
	) => ({
		type,
		text,
		icon
	})
)

export default parameterValueDisplaySelector
