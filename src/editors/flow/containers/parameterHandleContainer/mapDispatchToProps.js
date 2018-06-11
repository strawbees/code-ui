import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeUpdateInstanceParameterByValueCode,
	setDisconnectingParameterId,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	safeUpdateInstanceParameterByValueCode,
	setDisconnectingParameterId,
})
