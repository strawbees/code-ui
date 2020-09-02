import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setSimulatorReport,
} from 'src/editors/flow/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setSimulatorReport,
})

export default mapDispatchToProps
