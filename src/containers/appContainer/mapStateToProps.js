import { createSelector } from 'reselect'
import routesLoadedSelector from 'src/selectors/routesLoadedSelector'
import stringsLoadedSelector from 'src/selectors/stringsLoadedSelector'
import localesLoadedSelector from 'src/selectors/localesLoadedSelector'

export default createSelector(
	[
		routesLoadedSelector,
		stringsLoadedSelector,
		localesLoadedSelector
	],
	(
		routesLoaded,
		stringsLoaded,
		localesLoaded
	) => ({
		routesLoaded,
		stringsLoaded,
		localesLoaded
	})
)
