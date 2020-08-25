import { createSelector } from 'reselect'
import codingCardsFlowFormatedEntitiesSelector from 'src/selectors/codingCardsFlowFormatedEntitiesSelector'

const codingCardsFlowEntrySelector = () => createSelector(
	[
		(_, props) => props && props.id,
		codingCardsFlowFormatedEntitiesSelector(),
	],
	(
		id,
		codingCardsFlowFormatedEntities,
	) => codingCardsFlowFormatedEntities && codingCardsFlowFormatedEntities[id]
)

export default codingCardsFlowEntrySelector
