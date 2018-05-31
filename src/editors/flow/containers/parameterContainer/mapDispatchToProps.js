import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	addInstanceParameterItem,
	removeInstanceParameterItem
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	addInstanceParameterItem,
	removeInstanceParameterItem
})
