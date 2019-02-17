import { createStructuredSelector } from 'reselect'
import stringsLoadedSelector from 'src/selectors/stringsLoadedSelector'
import localesLoadedSelector from 'src/selectors/localesLoadedSelector'
import setupDisplayPageLoaderSelector from 'src/selectors/setupDisplayPageLoaderSelector'
import setupDisplayErrorSelector from 'src/selectors/setupDisplayErrorSelector'

export default () => createStructuredSelector({
	stringsLoaded     : stringsLoadedSelector(),
	localesLoaded     : localesLoadedSelector(),
	displayPageLoader : setupDisplayPageLoaderSelector(),
	displayError      : setupDisplayErrorSelector(),
})
