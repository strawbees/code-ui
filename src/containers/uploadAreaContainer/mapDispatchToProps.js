import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	uploadHex,
	uploadMutipleHexes,
	clearUploadError,
} from 'src/actions/uploader'

const mapDispatchToProps = autobindDispatchToActionCreators({
	uploadHex,
	uploadMutipleHexes,
	clearUploadError,
})

export default mapDispatchToProps
