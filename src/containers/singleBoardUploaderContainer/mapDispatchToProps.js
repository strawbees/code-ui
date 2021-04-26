import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { uploadMutipleHexes } from 'src/actions/uploader'

const mapDispatchToProps = autobindDispatchToActionCreators({
	uploadMutipleHexes
})

export default mapDispatchToProps
