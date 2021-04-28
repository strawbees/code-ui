import {
	logOpenCollapsed,
	logClose,
	logError
} from './log'

export function delay(millis) {
	return new Promise(r => setTimeout(r, millis))
}

export function arrayMedian(s) {
	const ordered = []
	s.reduce((a, c) => a.set(c, (a.get(c) || 0) + 1), new Map())
		.forEach((count, value) => ordered.push({
			count, value
		}))
	ordered.sort((a, b) => a.count < b.count)
	const median = ordered.shift()
	if (median) {
		return median.value
	}
	return null
}

export function arrayDiff(a, b) {
	return a.filter(o => !b.includes(o))
}

export function inPlaceArrayDiff(a, b) {
	for (let i = a.length - 1; i >= 0; i--) {
		const o = a[i]
		const iB = b.indexOf(o)
		if (iB !== -1) {
			const iA = a.indexOf(o)
			a.splice(iA, 1)
		}
	}
}

export function arrayMergeUnique(a, b) {
	return a.concat(arrayDiff(b, a))
}

export function inPlaceArrayConcat(a, b) {
	return b.forEach(o => a.push(o))
}

export function pad(data, pageSize) {
	safeWhile(
		() => data.length % pageSize !== 0,
		() => data.push(0),
		error => logError(error),
		pageSize
	)

	return data
}

export function generateUniqueId() {
	const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let str = ''
	for (let i = 0; i < 10; ++i) {
		const rand = Math.floor(Math.random() * ALPHABET.length)
		str += ALPHABET.substring(rand, rand + 1)
	}
	return str
}

export function safeWhile(conditionFn, loopFn, errorFn, maxIterations) {
	maxIterations = maxIterations || 500
	let count = 0
	let forceBreak = false
	const breakFn = () => forceBreak = true

	if (typeof loopFn !== 'function') {
		throw new Error('safeWhile: 2nd argument is not a function!')
	}
	while (conditionFn()) {
		count++
		if (count > maxIterations) {
			if (typeof errorFn === 'function') {
				errorFn(new Error('Loop is stuck!'))
			}
			break
		} else if (forceBreak) {
			break
		}
		loopFn(breakFn)
	}
}

export async function asyncSafeWhile(conditionFn, loopFn, errorFn, maxIterations) {
	maxIterations = maxIterations || 500
	let count = 0
	let forceBreak = false
	const breakFn = () => forceBreak = true

	if (typeof loopFn !== 'function') {
		throw new Error('safeWhile: 2nd argument is not a function!')
	}
	while (await conditionFn()) {
		count++
		if (count > maxIterations) {
			if (typeof errorFn === 'function') {
				errorFn(new Error('Loop is stuck!'))
			}
			break
		} else if (forceBreak) {
			break
		}
		await loopFn(breakFn)
	}
}

export async function tryToExecute(generator, maxTries = 5, interval = 100) {
	let success = false
	let tries = 0
	let error
	let result
	while (!success && tries < maxTries) {
		tries++
		logOpenCollapsed('Try to execute', tries)
		try {
			result = await generator()
			success = true
			error = null
		} catch (e) {
			error = e
			await delay(interval)
		}
		logClose()
	}
	if (error) {
		throw error
	}
	return result
}

export function convertToTwoBytes(n) {
	const lo = (n & 0x00FF)
	const hi = (n & 0xFF00) >> 8
	return [hi, lo]
}
