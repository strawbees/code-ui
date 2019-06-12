import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalImportProgram,
	modalUploadCode,
} from 'src/actions/program'

export default autobindDispatchToActionCreators({
	modalImportProgram,
	modalUploadCode,
})
