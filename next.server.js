const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const getConfig = require('next/config').default

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const {
	publicRuntimeConfig : {
		ROOT_PATH,
		routes,
	}
} = getConfig()

const init = async () => {
	await app.prepare()

	createServer((req, res) => {
		// parse pathname
		const parsedUrl = parse(req.url, true)
		const { pathname } = parsedUrl
		console.log('>>>', req.url)
		// does it match a route without a trailing slash?
		if (routes[`${pathname}/`]) {
			// then add the trailing slash and redirect
			res.writeHead(301, {
				Location : req.url.replace(pathname, `${pathname}/`)
			})
			res.end()
			console.log('Redirected to trailing slash version of route', pathname)
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
			console.log('Rendered route', pathname)
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
			console.log('404', pathname)
			return
		}
		// remove the ROOT_PATH
		req.url = req.url.replace(
			pathname,
			pathname.replace(new RegExp(`^${ROOT_PATH}`), '')
		)
		// then just handle the request as usual
		handle(req, res, parse(req.url, true))
		console.log('ROOT_PATH handled request as usual', pathname)
	}).listen(3000, (err) => {
		if (err) throw err
		// eslint-disable-next-line no-console
		console.log('> Ready on http://localhost:3000')
	})
}
init()
