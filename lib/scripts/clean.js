const path = require('path')
const rimraf = require('../utils/rimraf')
const nextConfig = require('../../next.config.js')

const {
	NEXT_EXPORT_PATH,
} = nextConfig.publicRuntimeConfig

module.exports = async () => {
	await rimraf(NEXT_EXPORT_PATH)
	await rimraf(path.join(__dirname, '..', '..', 'code-nwjs-build'))
	await rimraf(path.join(__dirname, '..', '..', 'nwjs-temp'))
	await rimraf(path.join(__dirname, '..', '..', '.next'))
	await rimraf(path.join(__dirname, '..', '..', 'node_modules', '.cache', 'babel-loader'))
}
