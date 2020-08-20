import { createSelector } from 'reselect'
import codingCardsFlowEntitiesSelector from 'src/selectors/codingCardsFlowEntitiesSelector'

const codingCardsFlowIdsSelector = () => createSelector(
	[
		codingCardsFlowEntitiesSelector(),
	],
	(
		codingCardsFlowEntities,
	) => Object.keys(codingCardsFlowEntities)
)

export default codingCardsFlowIdsSelector
