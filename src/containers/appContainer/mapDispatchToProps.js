import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQuery,
	setRoutes,
	setLocales,
	setStrings,
	setAsPath,
	setUrlVars,
} from 'src/actions/setup'
import {
	setFlowProgram,
	setScratchProgram,
	setTextProgram,
} from 'src/actions/editor'

export default autobindDispatchToActionCreators({
	setQuery,
	setRoutes,
	setLocales,
	setStrings,
	setAsPath,
	setUrlVars,
	setFlowProgram,
	setScratchProgram,
	setTextProgram,
})
