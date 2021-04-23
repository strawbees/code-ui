import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	requestWebSerialAccess,
	resetWebSerialAccess,
} from 'src/actions/qbserial'

const mapDispatchToProps = autobindDispatchToActionCreators({
	requestWebSerialAccess,
	resetWebSerialAccess,
})

export default mapDispatchToProps
