import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalImportProgram,
	modalUploadCode,
} from 'src/actions/program'

const mapDispatchToProps = autobindDispatchToActionCreators({
	modalImportProgram,
	modalUploadCode,
})

export default mapDispatchToProps
