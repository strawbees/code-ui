const workboxBuild = require('workbox-build')

module.exports = async () => {
	await workboxBuild.generateSW({
		globDirectory : 'out',
		globPatterns  : [
			'{,!(static/favicon)/}**/*.{html,json,js,css,woff2,svg,png,cur,webmanifest}',
		],
		ignoreUrlParametersMatching : [/./],
		directoryIndex              : 'index.html',
		runtimeCaching              : [
			{
				urlPattern : new RegExp('/.*'),
				handler    : 'networkFirst'
			}
		],
		importWorkboxFrom : 'local',
		swDest            : 'out/service-worker.js',
	})
}
