import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { registerGetDropAreaRect } from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	registerGetDropAreaRect,
})

export default mapDispatchToProps
