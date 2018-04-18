import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'

export default createSelector(
	[
		refEditorSourceSelector,
		refEditorGeneratedCodeSelector,
		queryLocaleSelector,
		localeStringsSelector,
	],
	(
		source,
		generatedCode,
		queryLocale,
		localeStrings,
	) => ({
		source,
		generatedCode,
		key     : `${queryLocale}`,
		strings : localeStrings,
	})
)
