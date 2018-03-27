import { createSelector } from 'reselect'
import localesSelector from 'src/selectors/locales'
import queryLocaleSelector from 'src/selectors/queryLocale'

export default createSelector(
	[
		localesSelector,
		queryLocaleSelector
	],
	(
		locales,
		queryLocale
	) => locales.filter(
		locale => locale.id !== queryLocale
	)
)
