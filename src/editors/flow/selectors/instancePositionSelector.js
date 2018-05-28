import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

export default () => createSelector(
	[
		instanceSelector(),
	],
	(
		{ x, y }
	) => ({ x, y })
)
