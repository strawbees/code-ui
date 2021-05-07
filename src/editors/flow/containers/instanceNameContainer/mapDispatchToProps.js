import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { safeUpdateInstanceName } from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeUpdateInstanceName,
})

export default mapDispatchToProps
