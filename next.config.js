const fs = require('fs').promises
const path = require('path')

// default configs
const defaults = {
	CANONICAL_URL                 : 'http://localhost:3000',
	COMPILER_URL                  : 'https://strawbees-compiler-stage.us-east-1.elasticbeanstalk.com',
	STRAWBEES_CODE_API_URL        : 'https://cloud-api.strawbees.com',
	LOCALES                       : ['en', 'pt_BR', 'sv', 'zh-Hans-CN', 'ja'],
	ROOT_PATH                     : '',
	SHARE_LINKS_OMIT_ROOT_PATH    : true,
	USE_SERVICE_WORKER            : false,
	PREFER_WEB_SERIAL             : true,
	URL_SCHEME                    : 'strawbeescode',
	GAID                          : 'UA-NNNNNN-N',
	CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
	WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/strawbees/quirkbot-driver/releases/download/v2.0.0.0/Quirkbot-Windows-Drivers-Installer-v2.0.0.0.exe',
	DOWNLOAD_DESKTOP_APP_URL      : 'https://downloads.strawbees.com/code-desktop',
	NEXT_SERVER_PORT              : 3000,
	NEXT_EXPORT_PATH              : path.resolve(__dirname, 'out'),
	QUIRKBOT_USB_SERIAL_IDS       : [
		{ usbVendorId : 0x2886, usbProductId : 0xF004 },
		{ usbVendorId : 0x2886, usbProductId : 0xF005, isBootloader : true },
		{ usbVendorId : 0x2886, usbProductId : 0xF006, isBootloader : true },
		{ usbVendorId : 0x2886, usbProductId : 0xF007, isBootloader : true },
	],
}

// configs for common known targets
const commonConfigs = {
	web_stage : {
		CANONICAL_URL            : 'https://code-stage.strawbees.com',
		COMPILER_URL             : 'https://strawbees-compiler-stage.us-east-1.elasticbeanstalk.com',
		STRAWBEES_CODE_API_URL   : 'https://cloud-api.strawbees.com',
		LOCALES                  : ['en', 'pt_BR', 'sv', 'zh-Hans-CN', 'ja'],
		ROOT_PATH                : '',
		USE_SERVICE_WORKER       : true,
		PREFER_WEB_SERIAL        : true,
		URL_SCHEME               : 'strawbeescode-stage',
		GAID                     : 'UA-69443341-7',
		CHROME_EXTENSION_ID      : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		DOWNLOAD_DESKTOP_APP_URL : 'https://strawbees-downloads-stage.s3.amazonaws.com/code-desktop',
	},
	web_production : {
		CANONICAL_URL            : 'https://code.strawbees.com',
		COMPILER_URL             : 'https://strawbees-compiler.us-east-1.elasticbeanstalk.com',
		STRAWBEES_CODE_API_URL   : 'https://cloud-api.strawbees.com',
		LOCALES                  : ['en', 'pt_BR', 'sv', 'zh-Hans-CN', 'ja'],
		ROOT_PATH                : '',
		USE_SERVICE_WORKER       : true,
		PREFER_WEB_SERIAL        : false,
		URL_SCHEME               : 'strawbeescode',
		GAID                     : 'UA-69443341-8',
		CHROME_EXTENSION_ID      : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		DOWNLOAD_DESKTOP_APP_URL : 'https://downloads.strawbees.com/code-desktop',
	},
	desktop_stage : {
		CANONICAL_URL            : 'https://code-stage.strawbees.com',
		COMPILER_URL             : 'http://localhost:9511',
		STRAWBEES_CODE_API_URL   : 'https://cloud-api-stage.strawbees.com',
		LOCALES                  : ['en', 'pt_BR', 'sv', 'zh-Hans-CN', 'ja'],
		ROOT_PATH                : '/ui',
		USE_SERVICE_WORKER       : false,
		PREFER_WEB_SERIAL        : true,
		URL_SCHEME               : 'strawbeescode-stage',
		GAID                     : 'UA-69443341-7',
		CHROME_EXTENSION_ID      : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		DOWNLOAD_DESKTOP_APP_URL : 'https://strawbees-downloads-stage.s3.amazonaws.com/code-desktop',
	},
	desktop_production : {
		CANONICAL_URL            : 'https://code.strawbees.com',
		COMPILER_URL             : 'http://localhost:9511',
		STRAWBEES_CODE_API_URL   : 'https://cloud-api.strawbees.com',
		LOCALES                  : ['en', 'pt_BR', 'sv', 'zh-Hans-CN', 'ja'],
		ROOT_PATH                : '/ui',
		USE_SERVICE_WORKER       : false,
		PREFER_WEB_SERIAL        : false,
		URL_SCHEME               : 'strawbeescode',
		GAID                     : 'UA-69443341-8',
		CHROME_EXTENSION_ID      : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		DOWNLOAD_DESKTOP_APP_URL : 'https://downloads.strawbees.com/code-desktop',
	},
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
	}, {})),
}

module.exports = {
	useFileSystemPublicRoutes : false,
	publicRuntimeConfig       : config,
	assetPrefix               : config.ROOT_PATH,
	trailingSlash             : true,
	exportPathMap             : async () => JSON.parse(await fs.readFile(path.resolve(__dirname, 'static', 'routes.json'))),
	webpack                   : (webpackConfig) => {
		/**
		* mock fs, needed for the tree-sitter module
		*/
		webpackConfig.node = { fs : 'empty' }
		/**
		* svg loader
		*/
		// first remove any existing rules for svg
		const fileLoaderRule = webpackConfig.module.rules.find(rule => rule.test && rule.test.test('.svg'))
		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/
		}
		// then add the @svgr rule
		webpackConfig.module.rules.push({
			test : /\.svg$/,
			use  : [{
				loader  : '@svgr/webpack',
				options : {
					svgoConfig : {
						plugins : {
							removeViewBox : false,
						},
					},
				},
			}],
		})
		/**
		* aliases
		*/
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
