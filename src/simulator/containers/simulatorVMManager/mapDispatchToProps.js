import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setReport,
} from 'src/simulator/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setReport,
})

export default mapDispatchToProps
