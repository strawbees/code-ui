import { createSelector } from 'reselect'
import internalDataNodeEntitiesStringSelector from './internalDataNodeEntitiesStringSelector'

import {
	DISCONNECTED,
} from '../lib/quirkbot'

const nodeTypesWithDisconnectedWarningSelector = () => createSelector(
	[
		internalDataNodeEntitiesStringSelector(),
	],
	(
		entitiesString,
	) => {
		const entities = JSON.parse(entitiesString)
		return Object.keys(entities)
			.filter(key => entities[key].place === DISCONNECTED)
			.map(key => entities[key].nodeType)
	}
)

export default nodeTypesWithDisconnectedWarningSelector
