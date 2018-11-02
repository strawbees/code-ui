const execute = require('../utils/execute')

execute(async ({ fork }) => {
	// build
	await fork('lib/scripts/build.js')
	// upload
	await fork('lib/scripts/upload.js')
})
