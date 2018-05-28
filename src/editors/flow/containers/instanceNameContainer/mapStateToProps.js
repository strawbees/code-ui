import { createSelector } from 'reselect'
import instanceNameSelector from 'src/editors/flow/selectors/instanceNameSelector'

export default () => createSelector(
	[
		instanceNameSelector(),
	],
	(
		name,
	) => ({
		name,
	})
)
