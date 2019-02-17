const handler = require('serve-handler')
const http = require('http')
const clean = require('./clean')
const copyResources = require('./copyResources')
const manageLocales = require('./manageLocales')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	try {
		// clean
		await clean()
		// copy static resources
		await copyResources()
		// manage the locale files
		await manageLocales()
		// start static server
		const staticServer = http.createServer((request, response) =>
			handler(request, response, { public : 'static' })
		)
		staticServer.listen(1338)
		// start next
		await fork('next.server.js')
		// close the static server
		staticServer.close()
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during dev', error)
		// exit the process with an error
		process.exit(error)
	}
})
