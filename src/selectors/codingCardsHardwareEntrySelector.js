import { createSelector } from 'reselect'
import codingCardsHardwareFormatedEntitiesSelector from 'src/selectors/codingCardsHardwareFormatedEntitiesSelector'

export default () => createSelector(
	[
		(_, props) => props && props.id,
		codingCardsHardwareFormatedEntitiesSelector(),
	],
	(
		id,
		codingCardsHardwareFormatedEntities,
	) => codingCardsHardwareFormatedEntities && codingCardsHardwareFormatedEntities[id]
)
