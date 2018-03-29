import { createSelector } from 'reselect'
import localeStringsSelector from 'src/selectors/localeStringsSelector'

export default (key) => createSelector(
	[
		localeStringsSelector
	],
	(
		localeStrings
	) => {
		if (typeof localeStrings[key] !== 'undefined') {
			return localeStrings[key]
		}
		/* eslint-disable no-console */
		console.warn(`missing translation: ${key}`)
		/* eslint-enable no-console */
		return key
	}
)
