import { createSelector } from 'reselect'
import parameterValueDisplaySelector from 'src/editors/flow/selectors/parameterValueDisplaySelector'

const selector = () => createSelector(
	[
		parameterValueDisplaySelector(),
	],
	(
		valueDisplay,
	) => valueDisplay.type === 'OUTLET'
)

export default selector
