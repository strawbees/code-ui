import { createStructuredSelector } from 'reselect'
import stringsLoadedSelector from 'src/selectors/stringsLoadedSelector'
import setupDisplayPageLoaderSelector from 'src/selectors/setupDisplayPageLoaderSelector'
import setupDisplayErrorSelector from 'src/selectors/setupDisplayErrorSelector'

export default () => createStructuredSelector({
	stringsLoaded     : stringsLoadedSelector(),
	displayPageLoader : setupDisplayPageLoaderSelector(),
	displayError      : setupDisplayErrorSelector(),
})
