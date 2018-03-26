require('dotenv').config()

const serve = require('serve')
const path = require('path')
const execute = require('../utils/execute')
const modulePath = require('../utils/modulePath')
const rmdir = require('../utils/rmdir')
const mkdir = require('../utils/mkdir')
const cpdir = require('../utils/cpdir')


execute(async ({ exec }) => {
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
	const staticServer = serve(`${__dirname}/../../static`, { port : 1337 })
	// export the static site
	await exec('STATIC=static NODE_ENV=production next build')
	await exec('next export')
	// stop the static server
	staticServer.stop()
})
