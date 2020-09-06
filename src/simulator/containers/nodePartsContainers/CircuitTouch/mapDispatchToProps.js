import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setExternalNodeData,
} from '../../../actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setExternalNodeData,
})

export default mapDispatchToProps
