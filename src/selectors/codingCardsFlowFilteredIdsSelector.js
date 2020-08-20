import { createSelector } from 'reselect'
import codingCardsFlowFilterIdsSelector from 'src/selectors/codingCardsFlowFilterIdsSelector'
import codingCardsFlowEntitiesSelector from 'src/selectors/codingCardsFlowEntitiesSelector'

const selector = () => createSelector(
	[
		codingCardsFlowFilterIdsSelector(),
		codingCardsFlowEntitiesSelector(),
	],
	(
		codingCardsFlowFilterIds,
		codingCardsFlowEntities,
	) => Object.keys(codingCardsFlowEntities).filter(id =>
		codingCardsFlowEntities[id].hardware.filter(hardwareId =>
			codingCardsFlowFilterIds.indexOf(hardwareId) !== -1
		).length > 0
	)
)

export default selector
