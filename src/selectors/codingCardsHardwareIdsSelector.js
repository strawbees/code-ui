import { createSelector } from 'reselect'
import codingCardsHardwareEntitiesSelector from 'src/selectors/codingCardsHardwareEntitiesSelector'

const selector = () => createSelector(
	[
		codingCardsHardwareEntitiesSelector(),
	],
	(
		codingCardsHardwareEntities,
	) => Object.keys(codingCardsHardwareEntities)
)

export default selector
