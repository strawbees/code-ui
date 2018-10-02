import { createSelector } from 'reselect'
import instanceParametersSelector from 'src/editors/flow/selectors/instanceParametersSelector'

export default () => createSelector(
	[
		instanceParametersSelector(),
	],
	(
		parameters
	) => parameters.map(({ id }) => id)
)
