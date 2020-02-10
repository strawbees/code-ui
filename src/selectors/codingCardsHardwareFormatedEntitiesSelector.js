import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import codingCardsHardwareEntitiesSelector from 'src/selectors/codingCardsHardwareEntitiesSelector'

export default () => createSelector(
	[
		stateSelector(),
		codingCardsHardwareEntitiesSelector(),
	],
	(
		state,
		codingCardsHardwareEntities,
	) => Object.keys(codingCardsHardwareEntities).reduce((acc, id) => {
		acc[id] = {
			id,
			title : makeStringSelector(codingCardsHardwareEntities[id].title)(state)
		}
		return acc
	}, {})
)
