import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQuery,
	setRoutes,
	setLocales,
	setStrings,
	setAsPath,
	setUrlVars,
	setDisplayPageLoader,
} from 'src/actions/setup'
import {
	setup as setupEditor
} from 'src/actions/editor'

export default autobindDispatchToActionCreators({
	setQuery,
	setRoutes,
	setLocales,
	setStrings,
	setAsPath,
	setUrlVars,
	setDisplayPageLoader,
	setupEditor,
})
