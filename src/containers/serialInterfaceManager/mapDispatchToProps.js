import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialAllowed,
	setQbserialReady,
} from 'src/actions/qbserial'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialAllowed,
	setQbserialReady,
})

export default mapDispatchToProps
