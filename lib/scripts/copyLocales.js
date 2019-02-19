const path = require('path')
const rimraf = require('../utils/rimraf')
const cpdir = require('../utils/cpdir')

module.exports = async () => {
	await rimraf(path.join('static', 'i18n'))
	await cpdir(
		path.join('data', 'i18n', 'build'),
		path.join('static', 'i18n')
	)
}
