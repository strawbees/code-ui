const fs = require('fs').promises
const path = require('path')
const rimraf = require('../utils/rimraf')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	try {
		// create dist folder
		await rimraf('dist')
		await fs.mkdir('dist')

		// do the builds
		const configs = [
			'web_stage',
			'web_production',
			'desktop_stage',
			'desktop_production'
		]
		for (let i = 0; i < configs.length; i++) {
			process.env.CONFIG = configs[i]
			await fork(path.join('lib', 'scripts', 'build.js'))
			// move to dist folder
			await fs.rename('out', path.join('dist', process.env.CONFIG))
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during build', error)
		// exit the process with the error
		process.exit(error)
	}
})
