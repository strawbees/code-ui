import { createSelector } from 'reselect'
import internalDataEntitiesSelector from './internalDataEntitiesSelector'

const internalDataNodeSelector = (fnId) => createSelector(
	[
		(_, { id }) => id,
		internalDataEntitiesSelector(),
	],
	(
		id,
		entities
	) => entities[fnId || id]
)

export default internalDataNodeSelector
