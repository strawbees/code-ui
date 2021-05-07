import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { safeUpdateInstanceParameterByValueCode } from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeUpdateInstanceParameterByValueCode,
})

export default mapDispatchToProps
