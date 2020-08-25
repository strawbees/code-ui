import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
} from 'src/actions/modal'
import {
	modalDuplicateProgramData,
	modalShareProgramData,
	modalUploadCode,
	exportProgramToFile,
} from 'src/actions/program'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeOpenModal,
	modalDuplicateProgramData,
	modalShareProgramData,
	modalUploadCode,
	exportProgramToFile,
})

export default mapDispatchToProps
