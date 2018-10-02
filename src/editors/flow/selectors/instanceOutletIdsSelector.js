import { createSelector } from 'reselect'
import instanceOutletsSelector from 'src/editors/flow/selectors/instanceOutletsSelector'

export default () => createSelector(
	[
		instanceOutletsSelector(),
	],
	(
		parameters
	) => parameters.map(({ id }) => id)
)
