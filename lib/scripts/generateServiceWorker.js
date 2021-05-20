const workboxBuild = require('workbox-build')

module.exports = async (rootDest) => workboxBuild.generateSW({
	globDirectory : rootDest,
	globPatterns  : [
		'{,!(static/favicon)/}**/*.{html,json,js,css,woff2,svg,png,cur,mp3,webmanifest}',
	],
	ignoreURLParametersMatching : [/./],
	directoryIndex              : 'index.html',
	runtimeCaching              : [
		{
			urlPattern : new RegExp('/.*'),
			handler    : 'NetworkFirst',
		},
	],
	skipWaiting            : true,
	clientsClaim           : true,
	offlineGoogleAnalytics : true,
	swDest                 : `${rootDest}/service-worker.js`,
})
