const fs = require('fs').promises
const path = require('path')
const nextConfig = require('../../next.config.js')
const clean = require('./clean')
const copyLocales = require('./copyLocales')
const copyResources = require('./copyResources')
const generateServiceWorker = require('./generateServiceWorker')
const execute = require('../utils/execute')

const { ROOT_PATH } = nextConfig.publicRuntimeConfig

execute(async ({ exec }) => {
	try {
		// clean
		await clean()
		// copy static resources
		await copyResources()
		// copy locales
		await copyLocales()
		// export the static site
		const dest = 'out'
		process.env.NODE_ENV = 'production'
		await exec('next build')
		await exec(`next export -o ${dest}`)
		// move the resources to the root path destination
		const rootDest = path.join(dest, path.join.apply(null, ROOT_PATH.split('/')))
		await fs.rename(path.join(dest, '_next'), path.join(rootDest, '_next'))
		await fs.rename(path.join(dest, 'static'), path.join(rootDest, 'static'))
		// generate the service worker
		await generateServiceWorker(rootDest)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during build', error)
		// exit the process with the error
		process.exit(error)
	}
})
