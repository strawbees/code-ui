import { createSelector } from 'reselect'
import codingCardsHardwareEntitiesSelector from 'src/selectors/codingCardsHardwareEntitiesSelector'

export default () => createSelector(
	[
		codingCardsHardwareEntitiesSelector(),
	],
	(
		codingCardsHardwareEntities,
	) => Object.keys(codingCardsHardwareEntities)
)
