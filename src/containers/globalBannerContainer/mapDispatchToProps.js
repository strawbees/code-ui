import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import { persistentHideGlobalBanner } from 'src/actions/ui'

const mapDispatchToProps = autobindDispatchToActionCreators({
	hideBanner : persistentHideGlobalBanner
})

export default mapDispatchToProps
