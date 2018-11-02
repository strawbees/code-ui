const pkg = require('../../package.json')
const nwjsPkg = require('../../nwjs-src/package.json')
const cpdir = require('../utils/cpdir')
const saveJson = require('../utils/saveJson')
const execute = require('../utils/execute')

execute(async ({ exec, fork }) => {
	// build
	await fork('lib/scripts/build.js')
	// copy the nwjs src files
	await cpdir('nwjs-src', 'out')
	// add missing information to package
	nwjsPkg.name = `${pkg.name}-nwjs-${process.env.CONFIG || 'dev'}`
	nwjsPkg.author = pkg.author
	nwjsPkg.version = pkg.version
	await saveJson('out/package.json', nwjsPkg)
	// run the packager
	await exec('strawbees-app-packager out nwjs-out nwjs-temp')
})
