import { createSelector } from 'reselect'
import categoryColorSelector from 'src/editors/flow/selectors/categoryColorSelector'
import categoryNameSelector from 'src/editors/flow/selectors/categoryNameSelector'
import categoryIsFoldedSelector from 'src/editors/flow/selectors/categoryIsFoldedSelector'
import categoryVisibleNodeIdsSelector from 'src/editors/flow/selectors/categoryVisibleNodeIdsSelector'

export default createSelector(
	[
		categoryColorSelector,
		categoryNameSelector,
		categoryIsFoldedSelector,
		categoryVisibleNodeIdsSelector,
	],
	(
		color,
		name,
		folded,
		nodeIds,
	) => ({
		color,
		name,
		folded,
		nodeIds,
	})
)
