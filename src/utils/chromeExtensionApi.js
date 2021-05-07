import generateUniqueId from 'src/utils/generateUniqueId'

const LISTENERS = []

const generateEventListenerAdder = (eventName, extensionId) => (callback) => {
	if (typeof callback !== 'function') {
		return
	}
	if (!LISTENERS[eventName]) {
		LISTENERS[eventName] = []
	}

	let exists = false
	LISTENERS[eventName].forEach((handler) => {
		if (handler.callback === callback) {
			exists = true
		}
	})

	if (exists) {
		return
	}

	const port = window.chrome.runtime.connect(extensionId)
	const uuid = generateUniqueId()

	const message = {
		uuid,
		addListener : true,
		name        : eventName,
		arguments   : [],
	}

	const handler = {
		port,
		uuid,
		callback,
	}

	port.onMessage.addListener((response) => {
		if (!response.error) {
			const args = []
			Object.keys(response.arguments).forEach((index) => {
				args.push(response.arguments[index])
			})
			handler.callback.apply(this, args)
		}
	})
	port.postMessage(message)

	LISTENERS[eventName].push(handler)
}

const generateEventListenerRemover = (eventName) => (callback) => {
	if (!LISTENERS[eventName]) {
		return
	}
	let removed
	LISTENERS[eventName].forEach((handler, index) => {
		if (handler.callback === callback) {
			removed = handler
			LISTENERS[eventName].splice(index, 1)
		}
	})

	// Listener might be void in case we never connect to the extension
	if (removed) {
		const message = {
			removeListener : true,
			uuid           : removed.uuid,
			name           : eventName,
			arguments      : [],
		}

		removed.port.postMessage(message)
		removed.port.disconnect()
	}
}

export const generateMethod = (name, extensionId) => (...args) => new Promise((resolve, reject) => {
	const message = {
		name,
		arguments : args,
	}
	if (!window.chrome.runtime) {
		reject(new Error('Runtime not avaiable'))
		return
	}
	const port = window.chrome.runtime.connect(extensionId)
	port.onMessage.addListener((response) => {
		port.disconnect()
		if (response.error) {
			reject(response.error)
		} else {
			const responseArgs = []
			Object.keys(response.arguments).forEach((index) => {
				responseArgs.push(response.arguments[index])
			})
			resolve.apply(this, responseArgs)
		}
	})
	port.postMessage(message)
})

export const generateEvent = (eventName, extensionId) => ({
	add    : generateEventListenerAdder(eventName, extensionId),
	remove : generateEventListenerRemover(eventName),
})
