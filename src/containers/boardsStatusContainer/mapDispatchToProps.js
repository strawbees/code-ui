import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalOpenUploaderDependencies,
} from 'src/actions/uploader'

const mapDispatchToProps = autobindDispatchToActionCreators({
	openUploaderDependencies : modalOpenUploaderDependencies,
})

export default mapDispatchToProps
