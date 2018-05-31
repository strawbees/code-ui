import { createSelector } from 'reselect'
import parameterValueDisplaySelector from 'src/editors/flow/selectors/parameterValueDisplaySelector'
import parameterValueCodeSelector from 'src/editors/flow/selectors/parameterValueCodeSelector'

export default () => createSelector(
	[
		parameterValueDisplaySelector(),
		parameterValueCodeSelector()
	],
	(
		valueDisplay,
		valueCode,
	) => ({
		connected : valueDisplay.type === 'OUTLET',
		valueCode
	})
)
