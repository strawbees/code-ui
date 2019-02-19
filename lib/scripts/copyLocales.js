const path = require('path')
const rimraf = require('../utils/rimraf')
const cpdir = require('../utils/cpdir')

module.exports = async () => {
	await rimraf(path.join('static', 'locales'))
	await cpdir(
		path.join('data', 'locales'),
		path.join('static', 'locales')
	)
}
