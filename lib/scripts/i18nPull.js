const fs = require('fs').promises
const path = require('path')
const fetch = require('node-fetch')
const execute = require('../utils/execute')

const pullScratchBlocks = async (apiKey) => {
	// compute the Authorization header from the api key
	const Authorization = `Basic ${Buffer.from(apiKey).toString('base64')}`
	console.log(Authorization)
	// get a list of the available locales
	const locales = (await (await fetch('https://www.transifex.com/api/2/project/scratch-editor/?details', {
		headers : { Authorization }
	})).json()).teams
	console.log(locales)
}

execute(async ({ exec }) => {
	try {
		await pullScratchBlocks('1/f57cb46afa20004a1d879d79ca5f61b8eb37bd18')

	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during i18nPull', error)
		// exit the process with the error
		process.exit(error)
	}
})
