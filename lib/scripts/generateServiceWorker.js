const workboxBuild = require('workbox-build')

module.exports = async (rootDest) => workboxBuild.generateSW({
	globDirectory : rootDest,
	globPatterns  : [
		'{,!(static/favicon)/}**/*.{html,json,js,css,woff2,svg,png,cur,mp3,webmanifest}',
	],
	ignoreUrlParametersMatching : [/./],
	directoryIndex              : 'index.html',
	runtimeCaching              : [
		{
			urlPattern : new RegExp('/.*'),
			handler    : 'networkFirst'
		}
	],
	skipWaiting            : true,
	clientsClaim           : true,
	offlineGoogleAnalytics : true,
	importWorkboxFrom      : 'local',
	swDest                 : `${rootDest}/service-worker.js`,
})
