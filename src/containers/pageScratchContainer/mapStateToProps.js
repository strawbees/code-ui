import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import localeStringsSelector from 'src/selectors/localeStringsSelector'

export default createSelector(
	[
		queryLocaleSelector,
		localeStringsSelector
	],
	(
		queryLocale,
		localeStrings
	) => ({
		strings : localeStrings,
		key     : `${queryLocale}`
	})
)
