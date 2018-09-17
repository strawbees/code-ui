import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	safeClearLoggedInData,
} from 'src/actions/storage'
import {
	expandAccountSettings,
	collapseAccountSettings,
} from 'src/actions/ui'


export default autobindDispatchToActionCreators({
	logout : safeClearLoggedInData,
	expandAccountSettings,
	collapseAccountSettings,
})
