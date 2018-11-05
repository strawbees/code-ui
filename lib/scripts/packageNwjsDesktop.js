const path = require('path')
const execute = require('../utils/execute')

execute(async ({ fork }) => {
	process.env.CONFIG = 'desktop'
	await fork(path.join('lib', 'scripts', 'packageNwjs.js'))
})
