import { createSelector } from 'reselect'
import categoryNodesSelector from 'src/editors/flow/selectors/categoryNodesSelector'

const categoryNodeIdsSelector = () => createSelector(
	[
		categoryNodesSelector(),
	],
	(
		categoryNodes
	) => categoryNodes.map(({ id }) => id)
)

export default categoryNodeIdsSelector
