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
}

export const remove = (base, key) => {
	localStorage.removeItem(`_storage_${base}_${key}`)
}

export const getKeys = (base) =>
	Object.keys(localStorage)
		.filter(key => key.indexOf(`_storage_${base}_`) === 0)
		.map(key => key.replace(`_storage_${base}_`, ''))

// External program change
/* eslint-disable no-underscore-dangle */
export const setExternalChangeListener = (fn) => {
	if (!fn) {
		window.removeEventListener('storage', _externalChangeListener)
		return
	}
	_externalChangeListenerFn = fn
	window.addEventListener('storage', _externalChangeListener)
}

let _externalChangeListenerFn
const _externalChangeListener = ({ key, newValue : rawValue }) => {
	if (!_externalChangeListenerFn || !key) {
		return
	}
	if (key.indexOf('_storage_') !== 0) {
		return
	}
	const [,, base, id] = key.split('_')
	let value
	if (rawValue) {
		try {
			value = JSON.parse(rawValue)
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error('Error trying to update storage', e)
		}
	}
	_externalChangeListenerFn(base, id, value, rawValue)
}
/* eslint-disable no-underscore-dangle */
