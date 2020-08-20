import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeUpdateInstanceParameterByValueCode,
	setDisconnectingParameterId,
} from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeUpdateInstanceParameterByValueCode,
	setDisconnectingParameterId,
})

export default mapDispatchToProps
