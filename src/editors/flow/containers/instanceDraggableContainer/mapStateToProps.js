import { createSelector } from 'reselect'
import instanceXSelector from 'src/editors/flow/selectors/instanceXSelector'
import instanceYSelector from 'src/editors/flow/selectors/instanceYSelector'

export default () => createSelector(
	[
		instanceXSelector(),
		instanceYSelector(),
	],
	(
		x,
		y,
	) => ({
		x,
		y
	})
)
