import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeClearLoggedInData,
} from 'src/actions/storage'


export default autobindDispatchToActionCreators({
	logout : safeClearLoggedInData,
})
