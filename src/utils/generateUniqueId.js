const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const random = (length) => {
	let str = ''
	for (let i = 0; i < length; ++i) {
		const rand = Math.floor(Math.random() * ALPHABET.length)
		str += ALPHABET.substring(rand, rand + 1)
	}
	return str
}

const date = (length = 1) => {
	const now = Date.now().toString()
	if (length > now.length) {
		({ length } = now.length)
	}
	return now.substr(now.length - length)
}

const id = () => `${random(10)}${date(4)}${random(2)}`

export default id
