import { createSelector } from 'reselect'
import categoryDefinitionSelector from 'src/editors/flow/selectors/categoryDefinitionSelector'

export default createSelector(
	[
		categoryDefinitionSelector,
	],
	(
		{ color }
	) => color
)
