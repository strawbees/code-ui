import { createSelector } from 'reselect'
import categoryDefinitionSelector from 'src/editors/flow/selectors/categoryDefinitionSelector'

const selector = () => createSelector(
	[
		categoryDefinitionSelector(),
	],
	(
		{ color }
	) => color
)

export default selector
