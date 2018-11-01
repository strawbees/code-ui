export default (input, init = {}) => {
	let controller
	if (typeof window.AbortController !== 'undefined') {
		controller = new AbortController()
	} else {
		controller = {
			abort  : () => throw new Error('AbortError'),
			signal : () => {},
		}
	}
	init.controller = controller
	init.signal = controller.signal
	return fetch(input, init)
}
