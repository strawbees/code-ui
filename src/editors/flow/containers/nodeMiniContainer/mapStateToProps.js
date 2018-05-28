import { createSelector } from 'reselect'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'

export default () => createSelector(
	[
		nodeNameSelector(),
		nodeColorSelector(),
		nodeIconSelector()
	],
	(
		name,
		color,
		icon,
	) => ({
		name,
		color,
		icon,
	})
)
