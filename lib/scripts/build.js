const handler = require('serve-handler')
const http = require('http')
const clean = require('./clean')
const copyResources = require('./copyResources')
const manageLocales = require('./manageLocales')
const generateServiceWorker = require('./generateServiceWorker')
const execute = require('../utils/execute')

execute(async ({ exec }) => {
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
		// export the static site
		process.env.NODE_ENV = 'production'
		await exec('next build')
		await exec('next export')
		// generate the service worker
		await generateServiceWorker()
		// stop the static server
		staticServer.close()
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during build', error)
		// exit the process with the error
		process.exit(error)
	}
})
