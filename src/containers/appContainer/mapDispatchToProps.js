import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setSetup,
	setRoutes,
	setLocales,
	setStrings,
	setDisplayPageLoader,
} from 'src/actions/setup'
import {
	setup as setupEditor
} from 'src/actions/editor'

export default autobindDispatchToActionCreators({
	setSetup,
	setRoutes,
	setLocales,
	setStrings,
	setDisplayPageLoader,
	setupEditor,
})
