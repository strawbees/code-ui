const fs = require('fs').promises
const path = require('path')
const rimraf = require('../utils/rimraf')
const execute = require('../utils/execute')
const nextConfig = require('../../next.config.js')

const {
	NEXT_EXPORT_PATH,
} = nextConfig.publicRuntimeConfig

execute(async ({ fork }) => {
	try {
		// create temp directory
		const temp = '.prebuild-cache'
		await rimraf(temp)
		await fs.mkdir(temp)

		// do the builds
		const configs = [
			'web_stage',
			'web_production',
			'desktop_stage',
			'desktop_production'
		]
		for (let i = 0; i < configs.length; i++) {
			process.env.CONFIG = configs[i]
			await fork(path.resolve(__dirname, '..', '..', 'lib', 'scripts', 'build.js'))
			// move to temp directory
			await fs.rename(NEXT_EXPORT_PATH, path.join(temp, process.env.CONFIG))
		}
		// move temp directory to NEXT_EXPORT_PATH
		await rimraf(NEXT_EXPORT_PATH)
		await fs.rename(temp, NEXT_EXPORT_PATH)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during build', error)
		// exit the process with the error
		process.exit(error)
	}
})
