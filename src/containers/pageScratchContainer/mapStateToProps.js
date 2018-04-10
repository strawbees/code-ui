import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

export default createSelector(
	[
		refEditorIdSelector,
		refEditorSourceSelector,
		queryLocaleSelector,
		localeStringsSelector,
	],
	(
		id,
		source,
		queryLocale,
		localeStrings,
	) => ({
		id,
		source,
		saved   : id !== null,
		strings : localeStrings,
		key     : `${queryLocale}`,
	})
)
