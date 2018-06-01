import { createSelector } from 'reselect'
import parameterValueCodeSelector from 'src/editors/flow/selectors/parameterValueCodeSelector'

export default () => createSelector(
	[
		parameterValueCodeSelector()
	],
	(
		valueCode,
	) => ({
		valueCode
	})
)
