import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
	closeModal,
} from 'src/actions/modal'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeOpenModal,
	closeModal,
})

export default mapDispatchToProps
