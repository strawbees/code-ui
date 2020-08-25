import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import foldedCategoryIdsSelector from 'src/editors/flow/selectors/foldedCategoryIdsSelector'

const categoryIsFoldedSelector = () => createSelector(
	[
		foldedCategoryIdsSelector(),
		propsIdSelector(),
	],
	(
		foldedCategoryIds,
		id,
	) => foldedCategoryIds.indexOf(id) !== -1
)

export default categoryIsFoldedSelector
