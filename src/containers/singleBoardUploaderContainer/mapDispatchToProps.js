import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { uploadHex } from 'src/actions/uploader'

const mapDispatchToProps = autobindDispatchToActionCreators({
	uploadHex
})

export default mapDispatchToProps
