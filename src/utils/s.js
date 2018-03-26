let STRINGS

export const registerStrings = strings => STRINGS = strings

export const getRegisteredStrings = () => STRINGS

export default (key) => {
	if (typeof STRINGS[key] !== 'undefined') {
		return STRINGS[key]
	}
	/* eslint-disable no-console */
	console.warn(`missing translation: ${key}`)
	/* eslint-enable no-console */
	return key
}
