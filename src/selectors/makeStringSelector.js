import { createSelector } from 'reselect'
import localeStringsSelector from 'src/selectors/localeStringsSelector'

export default (key) => createSelector(
	[
		localeStringsSelector
	],
	(
		localeStrings
	) => {
		if (!localeStrings) {
			// strings are not loaded
			return ''
		}
		if (typeof localeStrings[key] !== 'undefined') {
			return localeStrings[key]
		}
		if (process.NODE_EN !== 'production') {
			/* eslint-disable no-console */
			// console.warn(`missing translation: ${key}`)
			/* eslint-enable no-console */
		}
		return key
	}
)
