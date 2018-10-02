import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalOpenUploaderDependencies
} from 'src/actions/uploader'

export default autobindDispatchToActionCreators({
	openUploaderDependencies : modalOpenUploaderDependencies
})
