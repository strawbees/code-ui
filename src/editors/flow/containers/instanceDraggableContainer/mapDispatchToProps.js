import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateInstancePosition,
	removeInstance,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	updateInstancePosition,
	removeInstance,
})
