import { createSelector } from 'reselect'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'

const internalDataNodeSelector = (fnId) => createSelector(
	[
		(_, { id }) => id,
		internalDataNodeEntitiesSelector(),
	],
	(
		id,
		entities
	) => entities[fnId || id]
)

export default internalDataNodeSelector
