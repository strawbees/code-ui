import abortableFetch from './abortableFetch'

export default async (input, init = {}, timeout) => {
	if (!timeout) {
		return fetch(input, init)
	}
	const timer = setTimeout(() => init.controller.abort(), timeout)
	const result = await abortableFetch(input, init)
	clearTimeout(timer)
	return result
}
