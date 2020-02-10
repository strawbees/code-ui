import { createStructuredSelector } from 'reselect'
import codingCardsHardwareEntrySelector from 'src/selectors/codingCardsHardwareEntrySelector'

export default () => createStructuredSelector({
	hardware : codingCardsHardwareEntrySelector(),
})
