import { createSelector } from 'reselect'
import nodeCategoryDefinitionSelector from 'src/editors/flow/selectors/nodeCategoryDefinitionSelector'

const selector = () => createSelector(
	[
		nodeCategoryDefinitionSelector(),
	],
	(
		{ color }
	) => color
)

export default selector
