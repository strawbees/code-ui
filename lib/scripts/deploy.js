const path = require('path')
const upload = require('./upload')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	try {
		// build
		await fork(path.join('lib', 'scripts', 'build.js'))
		// upload
		await upload()
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during deploy', error)
		// exit the process with an error
		process.exit(error)
	}
})
