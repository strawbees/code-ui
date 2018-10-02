import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeClearLoggedInData,
	modalSignin,
	modalSignup,
} from 'src/actions/storage'


export default autobindDispatchToActionCreators({
	signin : () => modalSignin('strawbees'),
	signup : () => modalSignup('strawbees'),
	logout : safeClearLoggedInData,
})
