import { createSelector } from 'reselect'
import categoriesSelector from 'src/components/editors/flow/selectors/categoriesSelector'

export default createSelector(
	[
		categoriesSelector
	],
	(
		categories
	) => Object.keys(categories)
)
