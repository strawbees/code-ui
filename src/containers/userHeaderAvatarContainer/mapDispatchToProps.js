import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeClearLoggedInData,
	modalSignin,
	modalSignup,
} from 'src/actions/storage'

const mapDispatchToProps = autobindDispatchToActionCreators({
	signin : () => modalSignin('strawbees'),
	signup : () => modalSignup('strawbees'),
	logout : safeClearLoggedInData,
})

export default mapDispatchToProps
