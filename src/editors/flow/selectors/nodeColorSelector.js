import { createSelector } from 'reselect'
import nodeCategoryDefinitionSelector from 'src/editors/flow/selectors/nodeCategoryDefinitionSelector'

const nodeColorSelector = () => createSelector(
	[
		nodeCategoryDefinitionSelector(),
	],
	(
		{ color }
	) => color
)

export default nodeColorSelector
