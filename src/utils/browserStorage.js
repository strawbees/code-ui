import debounce from 'src/utils/debounce'

export const get = (base, key) => {
	try {
		return JSON.parse(localStorage.getItem(`_storage_${base}_${key}`))
	} catch (e) {
		return null
	}
}

export const set = (base, key, value) => {
	if (typeof value === 'undefined') {
		return
	}
	localStorage.setItem(`_storage_${base}_${key}`, JSON.stringify(value))
	// debounce(`_storage_${base}_${key}`, () => {
	//	localStorage.setItem(`_storage_${base}_${key}`, JSON.stringify(value))
	// }, 300)
}

export const remove = (base, key) => {
	localStorage.removeItem(`_storage_${base}_${key}`)
}

export const getProgramsIds = () =>
	Object.keys(localStorage)
		.filter(key => key.indexOf('_storage_program_') === 0)
		.map(key => key.replace('_storage_program_', ''))

const externalChangeListener = ({ key, newValue }) => {
	if (!externalChangeListenerFn || !key) {
		return
	}
	if (key.indexOf('_storage_program_') !== 0) {
		return
	}
	const id = key.replace('_storage_program_', '')
	if (newValue) {
		try {
			const data = JSON.parse(newValue)
			externalChangeListenerFn(id, data)
			return
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error('Error trying to update storage', e)
		}
	}
	externalChangeListenerFn(id)
}
let externalChangeListenerFn
export const setExternalChangeListener = (fn) => {
	if (!fn) {
		window.removeEventListener('storage', externalChangeListener)
		return
	}
	externalChangeListenerFn = fn
	window.addEventListener('storage', externalChangeListener)
}
