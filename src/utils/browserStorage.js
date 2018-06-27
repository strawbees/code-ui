export const get = (base, key) => {
	try {
		return JSON.parse(localStorage.getItem(`_storage_${base}_${key}`))
	} catch (e) {
		return null
	}
}

export const set = (base, key, value) => {
	if (typeof value === 'undefined') {
		return null
	}
	try {
		return localStorage.setItem(`_storage_${base}_${key}`, JSON.stringify(value))
	} catch (e) {
		return null
	}
}

export const remove = (base, key) => {
	try {
		return localStorage.removeItem(`_storage_${base}_${key}`)
	} catch (e) {
		return null
	}
}

export const getProgramsIds = () =>
	Object.keys(localStorage)
		.filter(key => key.indexOf('_storage_program_') === 0)
		.map(key => key.replace('_storage_program_', ''))
