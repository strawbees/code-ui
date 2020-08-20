import { createSelector } from 'reselect'
import categoryNodesSelector from 'src/editors/flow/selectors/categoryNodesSelector'

const selector = () => createSelector(
	[
		categoryNodesSelector(),
	],
	(
		categoryNodes
	) => categoryNodes.map(({ id }) => id)
)

export default selector
