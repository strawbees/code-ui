import { createSelector } from 'reselect'
import instanceParametersSelector from 'src/editors/flow/selectors/instanceParametersSelector'

const instanceParameterIdsSelector = () => createSelector(
	[
		instanceParametersSelector(),
	],
	(
		parameters
	) => parameters.map(({ id }) => id)
)

export default instanceParameterIdsSelector
