import { createSelector } from 'reselect'
import instanceParametersSelector from 'src/editors/flow/selectors/instanceParametersSelector'

const selector = () => createSelector(
	[
		instanceParametersSelector(),
	],
	(
		parameters
	) => parameters.map(({ id }) => id)
)

export default selector
