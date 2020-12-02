import { createSelector } from 'reselect'
import internalDataNodeIdsSelector from './internalDataNodeIdsSelector'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'

const internalDataNodeTypesSelector = () => createSelector(
	[
		internalDataNodeIdsSelector(),
		internalDataNodeEntitiesSelector(),
	],
	(
		ids,
		entities,
	) => ids.map(id => entities[id].nodeType)
)

export default internalDataNodeTypesSelector
