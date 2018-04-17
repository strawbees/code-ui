require('dotenv').config()

process.env.CANONICAL_URL = 'https://code.strawbees.com'
process.env.CANONICAL_URL_DEV = 'http://localhost:3000'
process.env.COMPILER_URL = 'https://compiler.quirkbot.com/'
process.env.COMPILER_URL_DEV = 'https://compiler.quirkbot.com/'

if (process.env.NODE_ENV !== 'production') {
	process.env.CANONICAL_URL = process.env.CANONICAL_URL_DEV
	process.env.COMPILER_URL = process.env.COMPILER_URL_DEV
}
