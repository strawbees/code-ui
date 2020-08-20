import { createSelector } from 'reselect'
import codingCardsFlowEntitiesSelector from 'src/selectors/codingCardsFlowEntitiesSelector'

const selector = () => createSelector(
	[
		codingCardsFlowEntitiesSelector(),
	],
	(
		codingCardsFlowEntities,
	) => Object.keys(codingCardsFlowEntities)
)

export default selector
