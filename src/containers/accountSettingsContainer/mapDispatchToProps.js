import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	clearStorage,
} from 'src/actions/storage'


export default autobindDispatchToActionCreators({
	clearStorage,
})
