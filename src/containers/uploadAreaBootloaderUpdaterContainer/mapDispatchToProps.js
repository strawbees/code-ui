import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	uploadMutipleHexes,
	clearUploadError,
} from 'src/actions/uploader'

const mapDispatchToProps = autobindDispatchToActionCreators({
	uploadMutipleHexes,
	clearUploadError,
})

export default mapDispatchToProps
