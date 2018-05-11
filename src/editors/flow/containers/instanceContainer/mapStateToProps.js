import { createSelector } from 'reselect'
import instanceNodeNameSelector from 'src/editors/flow/selectors/instanceNodeNameSelector'
import instanceColorSelector from 'src/editors/flow/selectors/instanceColorSelector'
import instanceIconSelector from 'src/editors/flow/selectors/instanceIconSelector'

export default createSelector(
	[
		instanceNodeNameSelector,
		instanceColorSelector,
		instanceIconSelector
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
