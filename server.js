const http = require('http')
const url = require('url')
const fs = require('fs').promises
const path = require('path')
const next = require('next')
const getNextConfig = require('next/config').default

const init = async () => {
	const dev = process.env.NODE_ENV !== 'production'
	const app = next({ dev })
	const handle = app.getRequestHandler()
	const routes = JSON.parse(await fs.readFile(path.join('static', 'routes.json')))
	const {
		publicRuntimeConfig
	} = getNextConfig()
	// eslint-disable-next-line no-console
	console.log('CONFIG:', publicRuntimeConfig)
	const {
		NEXT_SERVER_PORT,
		ROOT_PATH,
	} = publicRuntimeConfig
	await app.prepare()

	http.createServer((req, res) => {
		// parse pathname
		const parsedUrl = url.parse(req.url, true)
		const { pathname } = parsedUrl
		// does it match a route without a trailing slash?
		if (routes[`${pathname}/`]) {
			// then add the trailing slash and redirect
			res.writeHead(301, {
				Location : req.url.replace(pathname, `${pathname}/`)
			})
			res.end()
			return
		}
		// does it match a route?
		if (routes[pathname]) {
			// then render the known routes
			app.render(
				req,
				res,
				routes[pathname].page,
				routes[pathname].query
			)
			return
		}
		// does site runs from root?
		if (!ROOT_PATH) {
			// then just handle the request as usual
			handle(req, res, parsedUrl)
			return
		}
		// is the request outside of the root path?
		if (pathname.indexOf(ROOT_PATH) !== 0) {
			// the exit early with a 404
			res.writeHead(404)
			res.end()
			return
		}
		// remove the ROOT_PATH
		req.url = req.url.replace(
			pathname,
			pathname.replace(new RegExp(`^${ROOT_PATH}`), '')
		)
		// then just handle the request as usual
		handle(req, res, url.parse(req.url, true))
	}).listen(NEXT_SERVER_PORT, (err) => {
		if (err) throw err
		// eslint-disable-next-line no-console
		console.log(`> Ready on http://127.0.0.1:${NEXT_SERVER_PORT}`)
	})
}
init()
