import { createStructuredSelector } from 'reselect'
import codingCardsHardwareEntrySelector from 'src/selectors/codingCardsHardwareEntrySelector'

const mapStateToProps = () => createStructuredSelector({
	hardware : codingCardsHardwareEntrySelector(),
})

export default mapStateToProps
