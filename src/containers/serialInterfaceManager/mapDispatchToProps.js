import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialAllowed,
	setQbserialAllowedStatus,
	setQbserialReady,
} from 'src/actions/qbserial'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialAllowed,
	setQbserialAllowedStatus,
	setQbserialReady,
})

export default mapDispatchToProps
