import { createSelector } from 'reselect'
import parameterValueParsedSanitisedSelector from 'src/editors/flow/selectors/parameterValueParsedSanitisedSelector'

const selector = () => createSelector(
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

export default selector
