const routes = require('./static/routes')

const config = {
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

module.exports = {
	exportPathMap       : () => routes,
	publicRuntimeConfig : config[process.env.CONFIG || 'dev']
}
