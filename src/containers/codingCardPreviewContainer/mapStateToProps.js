import { createStructuredSelector } from 'reselect'
import codingCardsFlowEntrySelector from 'src/selectors/codingCardsFlowEntrySelector'
import codingCardsBlockEntrySelector from 'src/selectors/codingCardsBlockEntrySelector'

export default () => createStructuredSelector({
	flowEntry  : codingCardsFlowEntrySelector(),
	blockEntry : codingCardsBlockEntrySelector(),
})
