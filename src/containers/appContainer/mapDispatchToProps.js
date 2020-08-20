import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setSetup,
	setLocales,
	setStrings,
	setDisplayPageLoader,
	setOS,
} from 'src/actions/setup'
import {
	setHiddenGlobalBanners,
} from 'src/actions/ui'
import {
	setup as setupEditor
} from 'src/actions/editor'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setSetup,
	setLocales,
	setStrings,
	setDisplayPageLoader,
	setHiddenGlobalBanners,
	setupEditor,
	setOS,
})

export default mapDispatchToProps
