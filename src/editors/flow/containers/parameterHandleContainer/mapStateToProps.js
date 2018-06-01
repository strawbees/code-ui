import { createSelector } from 'reselect'
import parameterValueDisplaySelector from 'src/editors/flow/selectors/parameterValueDisplaySelector'

export default () => createSelector(
	[
		parameterValueDisplaySelector(),
	],
	(
		valueDisplay,
	) => ({
		connected : valueDisplay.type === 'OUTLET',
	})
)
