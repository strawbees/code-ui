import { createSelector } from 'reselect'

export default (key) => createSelector(
	[state => state.strings[key]],
	value => {
		if (typeof value !== 'undefined') {
			return value
		}
		/* eslint-disable no-console */
		console.warn(`missing translation: ${key}`)
		/* eslint-enable no-console */
		return key
	}
)
