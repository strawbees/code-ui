export const millis = Date.now
export const fmod = (a, b) => a % b
export const random = (min, max) => {
	if (typeof max === 'undefined') {
		max = min
		min = 0
	}
	return min + Math.floor(Math.random() * max)
}
export const {
	min,
	max,
	floor,
	ceil,
	round,
} = Math
