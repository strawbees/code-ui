import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	uploadHex,
	clearUploadError,
} from 'src/actions/uploader'

export default autobindDispatchToActionCreators({
	uploadHex,
	clearUploadError,
})
