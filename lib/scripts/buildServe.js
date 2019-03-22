const path = require('path')
const handler = require('serve-handler')
const http = require('http')
const nextConfig = require('../../next.config.js')
const execute = require('../utils/execute')

const {
	NEXT_SERVER_PORT,
	NEXT_EXPORT_PATH,
} = nextConfig.publicRuntimeConfig

execute(async ({ fork }) => {
	try {
		// build
		await fork(path.join('lib', 'scripts', 'build.js'))
		// server
		const staticServer = http.createServer((request, response) =>
			handler(request, response, { public : NEXT_EXPORT_PATH })
		)
		staticServer.listen(NEXT_SERVER_PORT, (err) => {
			if (err) throw err
			// eslint-disable-next-line no-console
			console.log(`> Ready on http://127.0.0.1:${NEXT_SERVER_PORT}`)
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during buildServe', error)
		// exit the process with an error
		process.exit(error)
	}
})
