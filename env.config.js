require('dotenv').config()

if (process.env.NODE_ENV !== 'production') {
	process.env.CANONICAL_URL = process.env.CANONICAL_URL_DEV
}
