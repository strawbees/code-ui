import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import rootPathSelector from 'src/selectors/rootPathSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import codingCardsFlowEntitiesSelector from 'src/selectors/codingCardsFlowEntitiesSelector'

const codingCardsFlowFormatedEntitiesSelector = () => createSelector(
	[
		stateSelector(),
		rootPathSelector(),
		codingCardsFlowEntitiesSelector(),
	],
	(
		state,
		rootPath,
		codingCardsFlowEntities,
	) => Object.keys(codingCardsFlowEntities).reduce((acc, id) => {
		acc[id] = {
			id,
			title       : makeStringSelector(codingCardsFlowEntities[id].title)(state),
			hardwareIds : codingCardsFlowEntities[id].hardware,
			source      : codingCardsFlowEntities[id].source,
			slides      : (codingCardsFlowEntities[id].slides && codingCardsFlowEntities[id].slides.map(slide => ({
				id    : slide.id,
				title : makeStringSelector(slide.title)(state),
				url   : `${rootPath}/static/coding-cards/${slide.id}.png`,
			}))) || []
		}
		return acc
	}, {})
)

export default codingCardsFlowFormatedEntitiesSelector
