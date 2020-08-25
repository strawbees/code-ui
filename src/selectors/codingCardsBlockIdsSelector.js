import { createSelector } from 'reselect'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

const codingCardsBlockIdsSelector = () => createSelector(
	[
		codingCardsBlockEntitiesSelector(),
	],
	(
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities)
)

export default codingCardsBlockIdsSelector
