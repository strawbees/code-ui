import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialReady,
} from 'src/actions/qbserial'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setQbserialLinks,
	setQbserialAvailable,
	setQbserialReady,
})

export default mapDispatchToProps
