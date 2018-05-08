import { createSelector } from 'reselect'
import foldedCategoryIdsSelector from 'src/editors/flow/selectors/foldedCategoryIdsSelector'

export default createSelector(
	[
		foldedCategoryIdsSelector,
		(state, { id }) => id
	],
	(
		foldedCategoryIds,
		id,
	) => foldedCategoryIds.indexOf(id) !== -1
)
