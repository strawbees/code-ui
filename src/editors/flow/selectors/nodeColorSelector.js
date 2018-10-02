import { createSelector } from 'reselect'
import nodeCategoryDefinitionSelector from 'src/editors/flow/selectors/nodeCategoryDefinitionSelector'

export default () => createSelector(
	[
		nodeCategoryDefinitionSelector(),
	],
	(
		{ color }
	) => color
)
