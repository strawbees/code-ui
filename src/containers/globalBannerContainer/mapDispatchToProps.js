import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { persistentHideGlobalBanner } from 'src/actions/ui'

export default autobindDispatchToActionCreators({
	hideBanner : persistentHideGlobalBanner
})
