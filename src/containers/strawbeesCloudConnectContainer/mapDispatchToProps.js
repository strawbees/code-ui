import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalSignup,
	modalSignin,
} from 'src/actions/storage'

const mapDispatchToProps = autobindDispatchToActionCreators({
	modalSignup,
	modalSignin,
})

export default mapDispatchToProps
