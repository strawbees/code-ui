import { createSelector } from 'reselect'
import codingCardsFlowEntitiesSelector from 'src/selectors/codingCardsFlowEntitiesSelector'

export default () => createSelector(
	[
		codingCardsFlowEntitiesSelector(),
	],
	(
		codingCardsFlowEntities,
	) => Object.keys(codingCardsFlowEntities)
)
