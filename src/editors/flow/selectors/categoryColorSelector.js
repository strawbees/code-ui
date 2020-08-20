import { createSelector } from 'reselect'
import categoryDefinitionSelector from 'src/editors/flow/selectors/categoryDefinitionSelector'

const categoryColorSelector = () => createSelector(
	[
		categoryDefinitionSelector(),
	],
	(
		{ color }
	) => color
)

export default categoryColorSelector
