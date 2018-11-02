const path = require('path')
const rimraf = require('../utils/rimraf')

module.exports = async () => {
	await rimraf('out')
	await rimraf('nwjs-out')
	await rimraf('nwjs-temp')
	await rimraf('.next')
	await rimraf(path.join('node_modules', '.cache', 'babel-loader'))
}
