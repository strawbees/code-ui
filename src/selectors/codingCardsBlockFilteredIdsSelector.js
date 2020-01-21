import { createSelector } from 'reselect'
import codingCardsBlockFilterIdsSelector from 'src/selectors/codingCardsBlockFilterIdsSelector'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

export default () => createSelector(
	[
		codingCardsBlockFilterIdsSelector(),
		codingCardsBlockEntitiesSelector(),
	],
	(
		codingCardsBlockFilterIds,
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities).filter(id =>
		codingCardsBlockEntities[id].hardware.filter(hardwareId =>
			codingCardsBlockFilterIds.indexOf(hardwareId) !== 0
		).length > 0
	)
)
