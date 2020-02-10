import { createSelector } from 'reselect'
import codingCardsBlockFormatedEntitiesSelector from 'src/selectors/codingCardsBlockFormatedEntitiesSelector'

export default () => createSelector(
	[
		(_, props) => props && props.id,
		codingCardsBlockFormatedEntitiesSelector(),
	],
	(
		id,
		codingCardsBlockFormatedEntities,
	) => codingCardsBlockFormatedEntities && codingCardsBlockFormatedEntities[id]
)
