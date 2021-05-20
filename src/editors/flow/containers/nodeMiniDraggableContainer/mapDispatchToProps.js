import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { safeAddInstance } from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeAddInstance,
})

export default mapDispatchToProps
