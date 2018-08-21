import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	clearStorage,
} from 'src/actions/storage'
import {
	expandAccountSettings,
	collapseAccountSettings,
} from 'src/actions/ui'


export default autobindDispatchToActionCreators({
	clearStorage,
	expandAccountSettings,
	collapseAccountSettings,
})
