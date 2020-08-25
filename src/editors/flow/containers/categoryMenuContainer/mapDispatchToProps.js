import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { toggleFoldedCategory } from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	toggleFoldedCategory
})

export default mapDispatchToProps
