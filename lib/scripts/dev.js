const clean = require('./clean')
const copyResources = require('./copyResources')
const copyLocales = require('./copyLocales')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	try {
		// clean
		await clean()
		// copy static resources
		await copyResources()
		// copy locales
		await copyLocales()
		// start next
		await fork('next.server.js')
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during dev', error)
		// exit the process with an error
		process.exit(error)
	}
})
