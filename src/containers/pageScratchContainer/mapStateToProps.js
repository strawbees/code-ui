import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

export default createSelector(
	[
		refEditorSourceSelector,
		queryLocaleSelector,
		localeStringsSelector,
	],
	(
		refEditorSource,
		queryLocale,
		localeStrings,
	) => ({
		refEditorSource,
		key     : `${queryLocale}`,
		strings : localeStrings,
	})
)
