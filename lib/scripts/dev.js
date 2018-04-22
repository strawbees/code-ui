const serve = require('serve')
const clean = require('./clean')
const copyResources = require('./copyResources')
const manageLocales = require('./manageLocales')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// clean
	await clean()
	// copy static resources
	await copyResources()
	// manage the locale files
	await manageLocales()
	// start static server
	serve(`${__dirname}/../../static`, { port : 1337 })
	// start next
	await fork('next.server.js')
})
