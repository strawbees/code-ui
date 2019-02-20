const fs = require('fs').promises
const path = require('path')

// default configs
const defaults = {
	CANONICAL_URL                 : 'http://code-dev.strawbees.com:3000',
	COMPILER_URL                  : 'https://compiler.quirkbot.com',
	STRAWBEES_CODE_API_URL        : 'https://api-stage.quirkbot.com',
	LOCALES                       : ['en', 'pt', 'sv'],
	ROOT_PATH                     : '',
	URL_SCHEME                    : 'strawbeescode',
	GAID                          : 'UA-NNNNNN-N',
	CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
	WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
	DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-stage/code-nwjs-build/versions',
	NEXT_SERVER_PORT              : 3000,
	NEXT_EXPORT_PATH              : 'out',
}

// configs for common known targets
const commonConfigs = {
	web_stage : {
		CANONICAL_URL                 : 'https://code-stage.strawbees.com',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		LOCALES                       : ['en', 'pt', 'sv'],
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode-stage',
		GAID                          : 'UA-69443341-7',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-stage/code-nwjs-build/versions',
	},
	web_production : {
		CANONICAL_URL                 : 'https://code.strawbees.com',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		LOCALES                       : ['en'],
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
		LOCALES                       : ['en', 'pt', 'sv'],
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode-stage',
		GAID                          : 'UA-69443341-7',
		CHROME_EXTENSION_ID           : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-stage-production/code-nwjs-build/versions',
	},
	desktop_production : {
		CANONICAL_URL                 : 'http://strawbeescode',
		COMPILER_URL                  : 'http://localhost:9511',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		LOCALES                       : ['en'],
		ROOT_PATH                     : '',
		URL_SCHEME                    : 'strawbeescode',
		GAID                          : 'UA-69443341-8',
		CHROME_EXTENSION_ID           : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions',
	}
}
// generate the final config, allowing overwritting from env
const config = {
	CONFIG : process.env.CONFIG || 'default',
	...defaults,
	...(process.env.CONFIG ? commonConfigs[process.env.CONFIG] : {}),
	...(Object.keys(defaults).reduce((acc, key) => {
		if (typeof process.env[key] !== 'undefined') {
			acc[key] = process.env[key]
		}
		return acc
	}, {}))
}


module.exports = {
	useFileSystemPublicRoutes : false,
	publicRuntimeConfig       : config,
	assetPrefix               : config.ROOT_PATH,
	exportPathMap             : async () => JSON.parse(await fs.readFile(path.join('static', 'routes.json'))),
	webpack                   : (webpackConfig) => {
		// svg loader
		webpackConfig.module.rules.push({
			test : /\.svg$/,
			use  : ['@svgr/webpack'],
		})
		// alias
		webpackConfig.resolve.alias = {
			...webpackConfig.resolve.alias,
			root   : path.resolve(__dirname),
			data   : path.resolve(__dirname, 'data'),
			static : path.resolve(__dirname, 'static'),
			src    : path.resolve(__dirname, 'src'),
		}
		return webpackConfig
	},
}
