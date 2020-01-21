import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import codingCardsFlowFilteredIdsSelector from 'src/selectors/codingCardsFlowFilteredIdsSelector'
import codingCardsBlockFilteredIdsSelector from 'src/selectors/codingCardsBlockFilteredIdsSelector'

export default () => createStructuredSelector({
	flowTitle    : makeStringSelector('coding_cards.flow.title'),
	blockTitle   : makeStringSelector('coding_cards.block.title'),
	flowCardIds  : codingCardsFlowFilteredIdsSelector(),
	blockCardIds : codingCardsBlockFilteredIdsSelector(),
})
