import { createSelector } from 'reselect'
import instancePositionSelector from 'src/editors/flow/selectors/instancePositionSelector'

export default () => createSelector(
	[
		instancePositionSelector()
	],
	(
		position
	) => ({
		position
	})
)
