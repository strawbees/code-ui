const path = require('path')
const execute = require('../utils/execute')

execute(async ({ exec, fork }) => {
	// prepare for nwjs
	await fork(path.join('lib', 'scripts', 'prepareForNwjs.js'))
	// run the packager
	await exec('strawbees-app-packager out code-nwjs-build nwjs-temp')
})