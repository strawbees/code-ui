const path = require('path')
const execute = require('../utils/execute')

execute(async ({ exec, fork }) => {
	try {
		// prepare for nwjs
		await fork(path.join('lib', 'scripts', 'prepareForNwjs.js'))
		// run the packager
		await exec('strawbees-app-packager out code-nwjs-build nwjs-temp')
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during prepareForNwjs', error)
		// exit the process with an error
		process.exit(error)
	}
})
