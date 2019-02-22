import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import rootPathSelector from 'src/selectors/rootPathSelector'

export default () => createSelector(
	[
		refEditorSourceSelector(),
		queryLocaleSelector(),
		localeStringsSelector(),
		rootPathSelector(),
	],
	(
		refEditorSource,
		queryLocale,
		localeStrings,
		rootPath,
	) => ({
		refEditorSource,
		key       : `${queryLocale}`,
		strings   : localeStrings,
		mediaPath : `${rootPath}/static/lib/scratch-blocks/media/`,
	})
)
