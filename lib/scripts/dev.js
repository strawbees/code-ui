require('dotenv').config()

const serve = require('serve')
const path = require('path')
const execute = require('../utils/execute')
const modulePath = require('../utils/modulePath')
const rmdir = require('../utils/rmdir')
const mkdir = require('../utils/mkdir')
const cpdir = require('../utils/cpdir')

execute(async ({ fork }) => {
	// clean
	await rmdir('out')
	await rmdir('.next')
	await rmdir('node_modules/.cache/babel-loader')
	// copy static resources
	await rmdir('static/lib/nprogress.css')
	await cpdir(
		path.join(modulePath('nprogress'), 'nprogress.css'),
		'static/lib/nprogress.css'
	)
	await rmdir('static/lib/scratch-blocks')
	await mkdir('static/lib/scratch-blocks/media')
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'media'),
		'static/lib/scratch-blocks/media'
	)
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'dist', 'web', 'vertical.js'),
		'static/lib/scratch-blocks/vertical.js'
	)
	// start static server
	serve(`${__dirname}/../../static`, { port : 1337 })
	// start next
	await fork('next.server.js')
})
