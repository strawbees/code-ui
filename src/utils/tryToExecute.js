import delay from './delay'

export default async (generator, maxTries = 5, interval = 100) => {
	let success = false
	let tries = 0
	let error
	let result
	while (!success && tries < maxTries) {
		tries++
		try {
			result = await generator()
			success = true
			error = null
		} catch (e) {
			error = e
			await delay(interval)
		}
	}
	if (!success) {
		throw error
	}
	return result
}
