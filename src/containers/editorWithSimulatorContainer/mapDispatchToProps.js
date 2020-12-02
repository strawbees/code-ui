import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
	closeModal,
} from 'src/actions/modal'
import {
	showSimulator,
	hideSimulator,
} from 'src/simulator/actions'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeOpenModal,
	closeModal,
	showSimulator,
	hideSimulator,
})

export default mapDispatchToProps
