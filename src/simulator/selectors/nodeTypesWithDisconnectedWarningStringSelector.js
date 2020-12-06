import { createSelector } from 'reselect'
import nodeTypesWithDisconnectedWarningSelector from './nodeTypesWithDisconnectedWarningSelector'

const nodeTypesWithDisconnectedWarningStringSelector = () => createSelector(
	[
		nodeTypesWithDisconnectedWarningSelector(),
	],
	(
		nodeTypes,
	) => JSON.stringify(nodeTypes)
)

export default nodeTypesWithDisconnectedWarningStringSelector
