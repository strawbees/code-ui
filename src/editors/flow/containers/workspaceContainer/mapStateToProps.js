import { createSelector } from 'reselect'
import instanceIdsSelector from 'src/editors/flow/selectors/instanceIdsSelector'

export default createSelector(
	[
		instanceIdsSelector
	],
	(
		instanceIds
	) => ({
		instanceIds
	})
)
