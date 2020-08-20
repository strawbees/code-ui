import { createStructuredSelector } from 'reselect'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'

const mapStateToProps = () => createStructuredSelector({
	available : qbserialAvailableSelector(),
	ready     : qbserialReadySelector(),
})

export default mapStateToProps
