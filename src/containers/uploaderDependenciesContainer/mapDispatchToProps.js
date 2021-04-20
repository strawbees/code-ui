import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	requestWebSerialAccess,
} from 'src/actions/qbserial'

const mapDispatchToProps = autobindDispatchToActionCreators({
	requestWebSerialAccess,
})

export default mapDispatchToProps
