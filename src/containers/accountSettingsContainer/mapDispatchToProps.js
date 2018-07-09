import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCredentials,
} from 'src/actions/storage'


export default autobindDispatchToActionCreators({
	setCredentials
})
