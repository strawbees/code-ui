import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

export default () => createSelector(
	[
		stateSelector(),
		codingCardsBlockEntitiesSelector(),
	],
	(
		state,
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities).reduce((acc, id) => {
		acc[id] = {
			id,
			title : makeStringSelector(codingCardsBlockEntities[id].title)(state)
		}
		return acc
	}, {})
)
