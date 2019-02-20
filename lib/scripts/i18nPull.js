const fs = require('fs').promises
const path = require('path')
const fetch = require('node-fetch')
const execute = require('../utils/execute')
const rimraf = require('../utils/rimraf')

const pullScratchBlocks = async (apiKey) => {
	// compute the Authorization header from the api key
	const Authorization = `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`
	// get a list of the available locales
	// eslint-disable-next-line no-console
	console.log('Donwloading language list for strach-blocks...')
	const locales = (await (await fetch(
		'https://www.transifex.com/api/2/project/scratch-editor/?details',
		{ headers : { Authorization } }
	)).json()).teams
	// eslint-disable-next-line no-console
	console.log(locales.join())
	// build a fresh directory
	// eslint-disable-next-line no-console
	console.log('Clearing the language directory...')
	await rimraf(path.join('data', 'i18n', 'scratch-blocks'))
	await fs.mkdir(path.join('data', 'i18n', 'scratch-blocks'), { recursive : true })
	// download the translation of each locale
	await Promise.all(locales.map(async (code) => {
		// fetch data
		const translation = JSON.parse((await (await fetch(
			`https://www.transifex.com/api/2/project/scratch-editor/resource/blocks/translation/${code}/`,
			{ headers : { Authorization } }
		)).json()).content)
		// save to disk
		// eslint-disable-next-line no-console
		console.log(`Saving translation for ${code}`)
		return fs.writeFile(
			path.join('data', 'i18n', 'scratch-blocks', `${code}.json`),
			JSON.stringify(translation, null, '\t')
		)
	}))
}
// const pullZanata = async (exec, user, apiKey) => {
// 	await exec(`zanata-cli pull --username ${user} --key ${apiKey} --create-skeletons`)
// }


execute(async ({ }) => {
	try {
		await pullScratchBlocks(process.env.TRANSIFEX_KEY)
		// await pullZanata(exec, process.env.ZANATA_USER, process.env.ZANATA_KEY)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during i18nPull', error)
		// exit the process with the error
		process.exit(error)
	}
})
