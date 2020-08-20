import { createSelector } from 'reselect'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

const selector = () => createSelector(
	[
		codingCardsBlockEntitiesSelector(),
	],
	(
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities)
)

export default selector
