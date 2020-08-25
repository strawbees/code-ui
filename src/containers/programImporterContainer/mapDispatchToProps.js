import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { closeModal } from 'src/actions/modal'

const mapDispatchToProps = autobindDispatchToActionCreators({
	onProgramClick : closeModal,
})

export default mapDispatchToProps
