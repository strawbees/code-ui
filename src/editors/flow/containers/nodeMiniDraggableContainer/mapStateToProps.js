import { createSelector } from 'reselect'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'
import dropAreaRectGetterSelector from 'src/editors/flow/selectors/dropAreaRectGetterSelector'

export default () => createSelector(
	[
		nodeNameSelector(),
		nodeColorSelector(),
		nodeIconSelector(),
		dropAreaRectGetterSelector(),
	],
	(
		name,
		color,
		icon,
		getDropAreaRect,
	) => ({
		name,
		color,
		icon,
		getDropAreaRect,
	})
)
