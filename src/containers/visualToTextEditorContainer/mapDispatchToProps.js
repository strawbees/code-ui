import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
	closeModal,
} from 'src/actions/modal'

export default autobindDispatchToActionCreators({
	safeOpenModal,
	closeModal,
})
