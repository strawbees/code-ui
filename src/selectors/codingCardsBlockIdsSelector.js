import { createSelector } from 'reselect'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

export default () => createSelector(
	[
		codingCardsBlockEntitiesSelector(),
	],
	(
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities)
)
