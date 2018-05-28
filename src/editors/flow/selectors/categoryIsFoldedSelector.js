import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import foldedCategoryIdsSelector from 'src/editors/flow/selectors/foldedCategoryIdsSelector'

export default () => createSelector(
	[
		foldedCategoryIdsSelector(),
		propsIdSelector(),
	],
	(
		foldedCategoryIds,
		id,
	) => foldedCategoryIds.indexOf(id) !== -1
)
