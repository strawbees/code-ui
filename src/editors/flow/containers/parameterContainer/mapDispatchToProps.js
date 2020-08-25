import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	addInstanceParameterItem,
	removeInstanceParameterItem
} from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	addInstanceParameterItem,
	removeInstanceParameterItem
})

export default mapDispatchToProps
