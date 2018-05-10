import { createSelector } from 'reselect'
import categoryNodesSelector from 'src/editors/flow/selectors/categoryNodesSelector'

export default createSelector(
	[
		categoryNodesSelector
	],
	(
		categoryNodes
	) => categoryNodes.map(({ id }) => id)
)
