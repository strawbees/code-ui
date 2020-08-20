import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import rootPathSelector from 'src/selectors/rootPathSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import codingCardsBlockEntitiesSelector from 'src/selectors/codingCardsBlockEntitiesSelector'

const selector = () => createSelector(
	[
		stateSelector(),
		rootPathSelector(),
		codingCardsBlockEntitiesSelector(),
	],
	(
		state,
		rootPath,
		codingCardsBlockEntities,
	) => Object.keys(codingCardsBlockEntities).reduce((acc, id) => {
		acc[id] = {
			id,
			title       : makeStringSelector(codingCardsBlockEntities[id].title)(state),
			hardwareIds : codingCardsBlockEntities[id].hardware,
			source      : codingCardsBlockEntities[id].source,
			slides      : (codingCardsBlockEntities[id].slides && codingCardsBlockEntities[id].slides.map(slide => ({
				id    : slide.id,
				title : makeStringSelector(slide.title)(state),
				url   : `${rootPath}/static/coding-cards/${slide.id}.png`,
			}))) || []
		}
		return acc
	}, {})
)

export default selector
