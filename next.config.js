const routes = require('./static/routes')

const configMode = process.env.CONFIG || 'dev'
const publicRuntimeConfig = {
	dev : {
		CANONICAL_URL : 'http://localhost:3000',
		COMPILER_URL  : 'https://compiler.quirkbot.com'
	},
	stage : {
		CANONICAL_URL : 'https://code.strawbees.com',
		COMPILER_URL  : 'https://compiler-stage.quirkbot.com'
	},
	production : {
		CANONICAL_URL : 'https://code.strawbees.com',
		COMPILER_URL  : 'https://compiler.quirkbot.com'
	}
}
// eslint-disable-next-line no-console
console.log('Using config -> ', process.env.CONFIG || 'dev')

module.exports = {
	exportPathMap             : () => routes,
	publicRuntimeConfig       : publicRuntimeConfig[configMode],
	useFileSystemPublicRoutes : false,
}
