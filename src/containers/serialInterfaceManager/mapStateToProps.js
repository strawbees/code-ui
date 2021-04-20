import { createStructuredSelector } from 'reselect'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialAllowedSelector from 'src/selectors/qbserialAllowedSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'

const mapStateToProps = () => createStructuredSelector({
	available : qbserialAvailableSelector(),
	allowed   : qbserialAllowedSelector(),
	ready     : qbserialReadySelector(),
})

export default mapStateToProps
