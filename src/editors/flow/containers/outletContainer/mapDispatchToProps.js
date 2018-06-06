import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInstanceParameter,
	highlightInstanceParameterDropArea
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	setInstanceParameter,
	highlightInstanceParameterDropArea,
})
