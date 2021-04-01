import { createSelector } from 'reselect'
import internalDataNodeEntitiesSelector from './internalDataNodeEntitiesSelector'

const internalDataNodeEntitiesStringSelector = () => createSelector(
	[
		internalDataNodeEntitiesSelector(),
	],
	(
		entities,
	) => JSON.stringify(entities)
)

export default internalDataNodeEntitiesStringSelector
