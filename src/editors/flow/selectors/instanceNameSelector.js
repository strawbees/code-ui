import { createSelector } from 'reselect'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'

const selector = () => createSelector(
	[
		instanceSelector(),
	],
	(
		{ name }
	) => name
)

export default selector
