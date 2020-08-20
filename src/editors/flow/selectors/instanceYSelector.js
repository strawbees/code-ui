import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

const instanceYSelector = () => createSelector(
	[
		instanceSelector(),
	],
	(
		{ y }
	) => y
)

export default instanceYSelector
