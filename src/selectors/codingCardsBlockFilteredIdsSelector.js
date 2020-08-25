import { createSelector } from 'reselect'
import codingCardsBlockFilterIdsSelector from 'src/selectors/codingCardsBlockFilterIdsSelector'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

const codingCardsBlockFilteredIdsSelector = () => createSelector(
	[
		codingCardsBlockFilterIdsSelector(),
		codingCardsBlockEntitiesSelector(),
	],
	(
		codingCardsBlockFilterIds,
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities).filter(id =>
		codingCardsBlockEntities[id].hardware.filter(hardwareId =>
			codingCardsBlockFilterIds.indexOf(hardwareId) !== -1
		).length > 0
	)
)

export default codingCardsBlockFilteredIdsSelector
