export default (key, state) => {
	if (typeof state.strings[key] !== 'undefined') {
		return state.strings[key]
	}
	/* eslint-disable no-console */
	console.warn(`missing translation: ${key}`)
	/* eslint-enable no-console */
	return key
}
