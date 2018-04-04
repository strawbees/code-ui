const get = () => {
	if (!process.browser) {
		return null
	}
	try {
		const storage = JSON.parse(window.localStorage.getItem('__storage__')) || {}
		return storage
	} catch (e) {
		/* eslint-disable no-console */
		console.log('Error loading local storage', e)
		/* eslint-enable no-console */
	}
	return null
}
const set = (storage) => {
	if (!process.browser) {
		return
	}
	try {
		window.localStorage.setItem('__storage__', JSON.stringify(storage))
	} catch (e) {
		/* eslint-disable no-console */
		console.log('Error saving local storage', e)
		/* eslint-enable no-console */
	}
}

export default {
	get,
	set
}
