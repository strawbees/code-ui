const path = require('path')
const routes = require('./data/routes.json')

// load the correct publicRuntimeConfig, based on the COFING enviroment variable
const configId = process.env.CONFIG || 'dev'
// eslint-disable-next-line no-console
console.log('Using config -> ', configId)
const configMap = {
	dev : {
		CANONICAL_URL                 : 'http://code-dev.strawbees.com:3000',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api-stage.quirkbot.com',
		LOCALES                       : ['en', 'pt'],
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode',
		GAID                          : 'UA-NNNNNN-N',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-stage/code-nwjs-build/versions',
	},
	web_stage : {
		CANONICAL_URL                 : 'https://code-stage.strawbees.com',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode',
		GAID                          : 'UA-69443341-7',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-stage/code-nwjs-build/versions',
	},
	web_production : {
		CANONICAL_URL                 : 'https://code.strawbees.com',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode',
		GAID                          : 'UA-69443341-8',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions',
	},
	desktop_stage : {
		CANONICAL_URL                 : 'http://strawbeescode-stage',
		COMPILER_URL                  : 'http://localhost:9511',
		STRAWBEES_CODE_API_URL        : 'https://api-stage.quirkbot.com',
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode',
		GAID                          : 'UA-69443341-7',
		CHROME_EXTENSION_ID           : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-stage-production/code-nwjs-build/versions',
	},
	desktop_production : {
		CANONICAL_URL                 : 'http://strawbeescode',
		COMPILER_URL                  : 'http://localhost:9511',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode',
		GAID                          : 'UA-69443341-8',
		CHROME_EXTENSION_ID           : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions',
	}
}
const publicRuntimeConfig = {
	...configMap[configId],
	// expose routes with the ROOT_PATH applied to them
	routes : Object.keys(routes).reduce((acc, pathname) => {
		acc[`${configMap[configId].ROOT_PATH}${pathname}`] = routes[pathname]
		return acc
	}, {}),
	// expose next server port
	NEXT_SERVER_PORT : 3000
}

module.exports = {
	publicRuntimeConfig,
	useFileSystemPublicRoutes : false,
	assetPrefix               : publicRuntimeConfig.ROOT_PATH,
	exportPathMap             : () => publicRuntimeConfig.routes,
	webpack                   : (config) => {
		// svg loader
		config.module.rules.push({
			test : /\.svg$/,
			use  : ['@svgr/webpack'],
		})
		// alias
		config.resolve.alias = {
			...config.resolve.alias,
			root   : path.resolve(__dirname),
			data   : path.resolve(__dirname, 'data'),
			static : path.resolve(__dirname, 'static'),
			src    : path.resolve(__dirname, 'src'),
		}
		return config
	},
}
