const withImages = require('next-images')
const routes = require('./static/routes')

const configMode = process.env.CONFIG || 'dev'
const publicRuntimeConfig = {
	dev : {
		CANONICAL_URL          : 'http://code-dev.strawbees.com:3000',
		COMPILER_URL           : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL : 'https://api.quirkbot.com',
		GAID                   : 'UA-69443341-6',
		CHROME_EXTENSION_ID    : 'ackaalhbfjagidmjlhlokoblhbnahegd',
	},
	stage : {
		CANONICAL_URL          : 'https://code-stage.strawbees.com',
		COMPILER_URL           : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL : 'https://api.quirkbot.com',
		GAID                   : 'UA-69443341-6',
		CHROME_EXTENSION_ID    : 'ackaalhbfjagidmjlhlokoblhbnahegd',
	},
	production : {
		CANONICAL_URL          : 'https://code.strawbees.com',
		COMPILER_URL           : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL : 'https://api.quirkbot.com',
		GAID                   : 'XXXXXXXXXXXX',
		CHROME_EXTENSION_ID    : 'ackaalhbfjagidmjlhlokoblhbnahegd',
	}
}
// eslint-disable-next-line no-console
console.log('Using config -> ', process.env.CONFIG || 'dev')

module.exports = withImages({
	exportPathMap             : () => routes,
	publicRuntimeConfig       : publicRuntimeConfig[configMode],
	useFileSystemPublicRoutes : false,
})
