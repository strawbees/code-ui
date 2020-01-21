import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import codingCardsFlowEntitiesSelector from 'src/selectors/codingCardsFlowEntitiesSelector'

export default () => createSelector(
	[
		stateSelector(),
		codingCardsFlowEntitiesSelector(),
	],
	(
		state,
		codingCardsFlowEntities,
	) => Object.keys(codingCardsFlowEntities).reduce((acc, id) => {
		acc[id] = {
			id,
			title : makeStringSelector(codingCardsFlowEntities[id].title)(state)
		}
		return acc
	}, {})
)
