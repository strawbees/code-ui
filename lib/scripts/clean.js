const rmdir = require('../utils/rmdir')

module.exports = async () => {
	await rmdir('out')
	await rmdir('.next')
	await rmdir('node_modules/.cache/babel-loader')
}
