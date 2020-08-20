import { createSelector } from 'reselect'
import instanceOutletsSelector from 'src/editors/flow/selectors/instanceOutletsSelector'

const selector = () => createSelector(
	[
		instanceOutletsSelector(),
	],
	(
		parameters
	) => parameters.map(({ id }) => id)
)

export default selector
