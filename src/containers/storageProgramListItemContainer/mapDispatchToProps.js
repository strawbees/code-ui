import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenModal,
} from 'src/actions/modal'
import {
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalShareProgramData,
	modalUploadCode,
	exportProgramToFile,
} from 'src/actions/program'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeOpenModal,
	modalRemoveProgram,
	modalDuplicateProgramById,
	modalShareProgramData,
	modalUploadCode,
	exportProgramToFile,
})

export default mapDispatchToProps
