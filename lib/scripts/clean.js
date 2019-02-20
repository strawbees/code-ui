const path = require('path')
const rimraf = require('../utils/rimraf')
const nextConfig = require('../../next.config.js')

const {
	NEXT_EXPORT_PATH,
} = nextConfig.publicRuntimeConfig

module.exports = async () => {
	await rimraf(NEXT_EXPORT_PATH)
	await rimraf('code-nwjs-build')
	await rimraf('nwjs-temp')
	await rimraf('.next')
	await rimraf(path.join('node_modules', '.cache', 'babel-loader'))
}
