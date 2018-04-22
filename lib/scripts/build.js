const serve = require('serve')
const clean = require('./clean')
const copyResources = require('./copyResources')
const manageLocales = require('./manageLocales')
const execute = require('../utils/execute')

execute(async ({ exec }) => {
	// clean
	await clean()
	// copy static resources
	await copyResources()
	// manage the locale files
	await manageLocales()
	// start static server
	const staticServer = serve(`${__dirname}/../../static`, { port : 1337 })
	// export the static site
	await exec('NODE_ENV=production next build')
	await exec('next export')
	// stop the static server
	staticServer.stop()
})
