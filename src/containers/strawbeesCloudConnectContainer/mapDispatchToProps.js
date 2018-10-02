import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalSignup,
	modalSignin,
} from 'src/actions/storage'

export default autobindDispatchToActionCreators({
	modalSignup,
	modalSignin,
})
