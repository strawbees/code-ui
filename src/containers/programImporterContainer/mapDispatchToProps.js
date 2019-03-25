import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { closeModal } from 'src/actions/modal'

export default autobindDispatchToActionCreators({
	onProgramClick : closeModal,
})
