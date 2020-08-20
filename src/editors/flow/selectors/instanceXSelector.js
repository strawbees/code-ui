import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

const instanceXSelector = () => createSelector(
	[
		instanceSelector(),
	],
	(
		{ x }
	) => x
)

export default instanceXSelector
