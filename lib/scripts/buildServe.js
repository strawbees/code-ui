require('dotenv').config()

const serve = require('serve')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// build
	await fork('lib/scripts/build.js')
	// server
	serve(`${__dirname}/../../out`, { port : 3000 })
})
