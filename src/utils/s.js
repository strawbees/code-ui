export default (strings, key) => {
	if (!strings) {
		// strings are not loaded
		return ''
	}
	if (typeof strings[key] !== 'undefined') {
		return strings[key]
	}
	if (process.NODE_EN !== 'production') {
		/* eslint-disable no-console */
		// console.warn(`missing translation: ${key}`)
		/* eslint-enable no-console */
	}
	return key
}
