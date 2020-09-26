import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInternalData,
} from '../../actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setInternalData,
})

export default mapDispatchToProps
