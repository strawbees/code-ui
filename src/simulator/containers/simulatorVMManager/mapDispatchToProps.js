import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInternalData,
} from 'src/simulator/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setInternalData,
})

export default mapDispatchToProps
