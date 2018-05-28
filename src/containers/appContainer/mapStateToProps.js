import { createStructuredSelector } from 'reselect'
import routesLoadedSelector from 'src/selectors/routesLoadedSelector'
import stringsLoadedSelector from 'src/selectors/stringsLoadedSelector'
import localesLoadedSelector from 'src/selectors/localesLoadedSelector'

export default () => createStructuredSelector({
	routesLoaded  : routesLoadedSelector(),
	stringsLoaded : stringsLoadedSelector(),
	localesLoaded : localesLoadedSelector(),
})
