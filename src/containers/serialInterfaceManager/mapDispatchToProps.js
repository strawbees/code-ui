import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialReady,
} from 'src/actions/qbserial'

export default autobindDispatchToActionCreators({
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialReady,
})
