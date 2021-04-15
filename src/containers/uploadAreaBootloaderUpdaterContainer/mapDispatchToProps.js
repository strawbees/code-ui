import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	uploadHex,
	clearUploadError,
} from 'src/actions/uploader'

const mapDispatchToProps = autobindDispatchToActionCreators({
	uploadHex,
	clearUploadError,
})

export default mapDispatchToProps
