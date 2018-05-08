import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import nodeCategoryDefinitionSelector from 'src/editors/flow/selectors/nodeCategoryDefinitionSelector'

export default createSelector(
	[
		nodeCategoryDefinitionSelector,
		(state, { id }) => makeStringSelector(`flow.node.${id}`)(state)
	],
	(
		{ color },
		name
	) => ({
		color,
		name,
	})
)
