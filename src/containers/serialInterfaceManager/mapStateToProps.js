import { createStructuredSelector } from 'reselect'
import qbserialAvailableSelector from 'src/selectors/qbserialAvailableSelector'
import qbserialAllowedSelector from 'src/selectors/qbserialAllowedSelector'
import qbserialAllowedStatusSelector from 'src/selectors/qbserialAllowedStatusSelector'
import qbserialReadySelector from 'src/selectors/qbserialReadySelector'

const mapStateToProps = () => createStructuredSelector({
	available     : qbserialAvailableSelector(),
	allowed       : qbserialAllowedSelector(),
	allowedStatus : qbserialAllowedStatusSelector(),
	ready         : qbserialReadySelector(),
})

export default mapStateToProps
