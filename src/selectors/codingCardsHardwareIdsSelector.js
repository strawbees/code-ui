import { createSelector } from 'reselect'
import codingCardsHardwareEntitiesSelector from 'src/selectors/codingCardsHardwareEntitiesSelector'

const codingCardsHardwareIdsSelector = () => createSelector(
	[
		codingCardsHardwareEntitiesSelector(),
	],
	(
		codingCardsHardwareEntities,
	) => Object.keys(codingCardsHardwareEntities)
)

export default codingCardsHardwareIdsSelector
