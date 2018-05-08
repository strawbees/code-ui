import { createSelector } from 'reselect'
import categoryColorSelector from 'src/editors/flow/selectors/categoryColorSelector'
import categoryNameSelector from 'src/editors/flow/selectors/categoryNameSelector'
import categoryIsFoldedSelector from 'src/editors/flow/selectors/categoryIsFoldedSelector'
import categoryNodeIdsSelector from 'src/editors/flow/selectors/categoryNodeIdsSelector'

export default createSelector(
	[
		categoryColorSelector,
		categoryNameSelector,
		categoryIsFoldedSelector,
		categoryNodeIdsSelector,
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
