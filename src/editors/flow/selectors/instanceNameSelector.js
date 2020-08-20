import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

const instanceNameSelector = () => createSelector(
	[
		instanceSelector(),
	],
	(
		{ name }
	) => name
)

export default instanceNameSelector
