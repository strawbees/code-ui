import { createStructuredSelector } from 'reselect'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'

export default () => createStructuredSelector({
	available : qbserialAvailableSelector(),
	ready     : qbserialReadySelector(),
})
