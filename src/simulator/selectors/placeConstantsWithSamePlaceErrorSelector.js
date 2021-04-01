import { createSelector } from 'reselect'
import internalDataNodeEntitiesStringSelector from './internalDataNodeEntitiesStringSelector'

const placeConstantsWithSamePlaceErrorSelector = () => createSelector(
	[
		internalDataNodeEntitiesStringSelector(),
	],
	(
		entitiesString,
	) => {
		const entities = JSON.parse(entitiesString)
		const countByPlaceMap = Object.keys(entities)
			.filter(key => typeof entities[key].place !== 'undefined')
			.map(key => entities[key].place)
			.reduce((map, place) => {
				if (!map.has(place)) {
					map.set(place, 0)
				}
				map.set(place, map.get(place) + 1)
				return map
			}, new Map())
		return Array.from(countByPlaceMap.keys())
			.filter(place => countByPlaceMap.get(place) > 1)
			.sort()
	}
)

export default placeConstantsWithSamePlaceErrorSelector
