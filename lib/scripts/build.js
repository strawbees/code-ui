const handler = require('serve-handler')
const http = require('http')
const fs = require('fs').promises
const path = require('path')
const nextConfig = require('../../next.config.js')
const clean = require('./clean')
const generateStaticData = require('./generateStaticData')
const copyResources = require('./copyResources')
const generateServiceWorker = require('./generateServiceWorker')
const execute = require('../utils/execute')

const {
	ROOT_PATH,
	NEXT_SERVER_PORT
} = nextConfig.publicRuntimeConfig

execute(async ({ exec }) => {
	try {
		// clean
		await clean()
		// copy static resources
		await copyResources()
		// generate static data
		await generateStaticData()
		// start a server for /static, with ROOT_PATH and NEXT_SERVER_PORT.
		// the reason is because server.js doesn't run during the export
		// and therefore the requests to /static will fail.
		const staticServer = http.createServer((request, response) => {
			request.url = request.url.replace(`${ROOT_PATH}/static/`, '/')
			handler(request, response, { public : 'static' })
		})
		staticServer.listen(NEXT_SERVER_PORT)
		// export the static site
		const dest = process.env.NEXT_BUILD_PATH || 'out'
		process.env.NODE_ENV = 'production'
		await exec('next build')
		await exec(`next export -o ${dest}`)
		// stop the static server
		staticServer.close()
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
