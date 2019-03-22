#!/usr/bin/env node
const path = require('path')
const fs = require('fs').promises
const rimraf = require('../utils/rimraf')
const cpdir = require('../utils/cpdir')
const modulePath = require('../utils/modulePath')

module.exports = async () => {
	await rimraf(path.resolve(__dirname, '..', '..', 'static', 'lib', 'scratch-blocks'))
	await fs.mkdir(path.resolve(__dirname, '..', '..', 'static', 'lib', 'scratch-blocks', 'media'), { recursive : true })
	await cpdir(
		path.resolve(modulePath('scratch-blocks'), 'media'),
		path.resolve(__dirname, '..', '..', 'static', 'lib', 'scratch-blocks', 'media')
	)
	await rimraf(path.resolve(__dirname, '..', '..', 'static', 'lib', 'scratch-blocks', 'media', 'extensions'))
	await cpdir(
		path.resolve(modulePath('scratch-blocks'), 'dist', 'web', 'vertical.js'),
		path.resolve(__dirname, '..', '..', 'static', 'lib', 'scratch-blocks', 'vertical.js')
	)
}
