const path = require('path')
const fs = require('fs').promises
const rimraf = require('../utils/rimraf')
const cpdir = require('../utils/cpdir')
const modulePath = require('../utils/modulePath')

module.exports = async () => {
	await rimraf(path.join('static', 'lib', 'scratch-blocks'))
	await fs.mkdir(path.join('static', 'lib', 'scratch-blocks', 'media'), { recursive : true })
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'media'),
		path.join('static', 'lib', 'scratch-blocks', 'media')
	)
	await rimraf(path.join('static', 'lib', 'scratch-blocks', 'media', 'extensions'))
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'dist', 'web', 'vertical.js'),
		path.join('static', 'lib', 'scratch-blocks', 'vertical.js')
	)
}
