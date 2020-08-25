import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	updateInstancePosition,
	removeInstance,
} from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	updateInstancePosition,
	removeInstance,
})

export default mapDispatchToProps
