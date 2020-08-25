import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { setDisplayAdancedNodes } from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setDisplayAdancedNodes
})

export default mapDispatchToProps
