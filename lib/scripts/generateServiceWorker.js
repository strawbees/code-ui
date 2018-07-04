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
				urlPattern : /^https?.*/,
				handler    : 'networkFirst'
			}
		],
		swDest : 'out/service-worker.js',
	})
}
