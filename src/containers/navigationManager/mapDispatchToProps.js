import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeOpenDialogModal,
} from 'src/actions/modal'
import {
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
} from 'src/actions/editor'
import {
	setDisplayPageLoader,
	setDisplayError,
} from 'src/actions/setup'
import {
	setPublicProfile,
} from 'src/actions/storage'

const mapDispatchToProps = autobindDispatchToActionCreators({
	safeOpenDialogModal,
	setCurrentEditorProgram,
	resetCurrentEditorProgram,
	setDisplayPageLoader,
	setDisplayError,
	setPublicProfile,
})

export default mapDispatchToProps
