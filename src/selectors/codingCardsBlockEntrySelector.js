import { createSelector } from 'reselect'
import codingCardsBlockFormatedEntitiesSelector from 'src/selectors/codingCardsBlockFormatedEntitiesSelector'

const codingCardsBlockEntrySelector = () => createSelector(
	[
		(_, props) => props && props.id,
		codingCardsBlockFormatedEntitiesSelector(),
	],
	(
		id,
		codingCardsBlockFormatedEntities,
	) => codingCardsBlockFormatedEntities && codingCardsBlockFormatedEntities[id]
)

export default codingCardsBlockEntrySelector
