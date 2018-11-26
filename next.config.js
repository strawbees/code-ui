const routes = require('./static/routes')

const configMode = process.env.CONFIG || 'dev'
const publicRuntimeConfig = {
	dev : {
		CANONICAL_URL                 : 'http://code-dev.strawbees.com:3000',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api-stage.quirkbot.com',
		GAID                          : 'XXXXXXXXXXXX',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-stage/code-nwjs-build/versions',
	},
	stage : {
		CANONICAL_URL                 : 'https://code-stage.strawbees.com',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		GAID                          : 'UA-69443341-7',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-stage/code-nwjs-build/versions',
	},
	production : {
		CANONICAL_URL                 : 'https://code.strawbees.com',
		COMPILER_URL                  : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		GAID                          : 'UA-69443341-8',
		CHROME_EXTENSION_ID           : 'ackaalhbfjagidmjlhlokoblhbnahegd',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions',
	},
	desktop : {
		CANONICAL_URL                 : 'https://code.strawbees.com',
		COMPILER_URL                  : 'http://localhost:9511',
		STRAWBEES_CODE_API_URL        : 'https://api.quirkbot.com',
		GAID                          : 'UA-69443341-9',
		CHROME_EXTENSION_ID           : 'jgbaejhmonchgianepimdbcpfgcbdmam',
		WINDOWS_DRIVERS_INSTALLER_URL : 'https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe',
		DOWNLOAD_DESKTOP_APP_URL      : 'https://s3.amazonaws.com/strawbees-downloads-production/code-nwjs-build/versions',
	}
}
// eslint-disable-next-line no-console
console.log('Using config -> ', configMode)

module.exports = {
	exportPathMap             : () => routes,
	publicRuntimeConfig       : publicRuntimeConfig[configMode],
	useFileSystemPublicRoutes : false,
}
