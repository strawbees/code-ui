import { createStructuredSelector } from 'reselect'
import codingCardsFlowEntrySelector from 'src/selectors/codingCardsFlowEntrySelector'
import codingCardsBlockEntrySelector from 'src/selectors/codingCardsBlockEntrySelector'

const mapStateToProps = () => createStructuredSelector({
	flowEntry  : codingCardsFlowEntrySelector(),
	blockEntry : codingCardsBlockEntrySelector(),
})

export default mapStateToProps
