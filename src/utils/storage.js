const get = () => {
	try {
		const storage = JSON.parse(localStorage.getItem('__storage__'))
		return storage
	} catch (e) {
		/* eslint-disable no-console */
		console.log('Error loading local storage', e)
		/* eslint-enable no-console */
	}
	return null
}
const set = (storage) => {
	try {
		localStorage.setItem('__storage__', JSON.stringify(storage))
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
