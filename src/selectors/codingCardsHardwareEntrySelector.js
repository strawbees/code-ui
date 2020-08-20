import { createSelector } from 'reselect'
import codingCardsHardwareFormatedEntitiesSelector from 'src/selectors/codingCardsHardwareFormatedEntitiesSelector'

const selector = () => createSelector(
	[
		(_, props) => props && props.id,
		codingCardsHardwareFormatedEntitiesSelector(),
	],
	(
		id,
		codingCardsHardwareFormatedEntities,
	) => codingCardsHardwareFormatedEntities && codingCardsHardwareFormatedEntities[id]
)

export default selector
