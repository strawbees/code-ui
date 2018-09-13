import { createStructuredSelector } from 'reselect'
import qbmidiAvailableSelector from 'src/selectors/qbmidiAvailableSelector'
import qbmidiReadySelector from 'src/selectors/qbmidiReadySelector'

export default () => createStructuredSelector({
	available : qbmidiAvailableSelector(),
	ready     : qbmidiReadySelector(),
})
