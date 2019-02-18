const path = require('path')
const fs = require('fs').promises
const pkg = require('../../package.json')
const nwjsPkg = require('../../nwjs-src/package.json')
const cpdir = require('../utils/cpdir')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	try {
		// build
		await fork(path.join('lib', 'scripts', 'build.js'))
		// copy the nwjs src files
		await cpdir('nwjs-src', 'out')
		// resolve the correct release type, based on the branch
		const branch = process.env.TRAVIS_BRANCH ||
			process.env.APPVEYOR_REPO_BRANCH ||
			'develop'
		const release = process.env.RELEASE_TYPE || (branch === 'master' ? 'production' : 'stage')
		// add missing information to package
		nwjsPkg.author = pkg.author
		nwjsPkg.version = pkg.version
		nwjsPkg.autoupdate = nwjsPkg.autoupdate[release]
		if (release === 'stage') {
			// Always use the SDK version of NWJS in stage
			if (nwjsPkg['nwjs-version'].indexOf('-sdk') === -1) {
				nwjsPkg['nwjs-version'] = `${nwjsPkg['nwjs-version']}-sdk`
			}
			// Always prepend DEV to the app name in stage
			nwjsPkg['display-name'] = `DEV ${nwjsPkg['display-name']}`
			nwjsPkg['executable-name'] = `DEV ${nwjsPkg['executable-name']}`
		}
		await fs.writeFile(path.join('out', 'package.json'), JSON.stringify(nwjsPkg, null, '\t'))
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during prepareForNwjs', error)
		// exit the process with an error
		process.exit(error)
	}
})
