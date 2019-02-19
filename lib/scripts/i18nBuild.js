const path = require('path')
const fs = require('fs').promises
const PO = require('pofile')
const rimraf = require('../utils/rimraf')
const execute = require('../utils/execute')

const reducePot = (acc, { msgctxt, msgid }) => {
	acc[msgctxt] = msgid
	return acc
}
const reducePo = (acc, { msgctxt, msgid, msgstr }) => {
	acc[msgctxt] = msgstr[0] || msgid
	return acc
}
const buildData = (locales, templates) =>
	locales.reduce(async (resolution, locale, localeIndex) => {
		const acc = await resolution
		acc[locale] = await buildTemplateData(templates, locale, localeIndex)
		return Promise.resolve(acc)
	}, Promise.resolve({}))
const buildTemplateData = (templates, locale, localeIndex) =>
	templates.reduce(async (resolution, template) => {
		let acc = await resolution
		let templateData
		// default locale
		if (localeIndex === 0) {
			templateData = PO.parse(
				await fs.readFile(
					path.join('data', 'i18n', 'templates', `${template}.pot`),
					'utf8'
				)
			).items.reduce(reducePot, {})
		} else {
			// other locales
			templateData = PO.parse(
				await fs.readFile(
					path.join('data', 'i18n', 'translations', template, `${locale}.po`),
					'utf8'
				)
			).items.reduce(reducePo, {})
		}
		acc = {
			...acc,
			...templateData
		}
		return Promise.resolve(acc)
	}, Promise.resolve({}))

execute(async () => {
	try {
		// get a list of the locales we care about
		const locales = JSON.parse(await fs.readFile(path.join('data', 'i18n', 'index.json'), 'utf8'))
		// get a list of the templates (based on the .pot files)
		const templates = (await fs.readdir(path.join('data', 'i18n', 'templates')))
			.filter(filename => filename.endsWith('.pot'))
			.map(filename => filename.replace('.pot', ''))

		// load all the data
		const data = await buildData(locales, templates)

		// build a fresh locales directory
		await rimraf(path.join('data', 'locales'))
		await fs.mkdir(path.join('data', 'locales'), { recursive : true })

		// save the index
		await fs.writeFile(
			path.join('data', 'locales', 'index.json'),
			JSON.stringify(locales.map((locale, localeIndex) => ({
				id      : data[locale]['locale.code'],
				name    : data[locale]['locale.name'],
				default : localeIndex === 0
			})), null, '\t')
		)
		// save the translations
		await locales.reduce(async (resolution, locale) => {
			await resolution
			return fs.writeFile(
				path.join('data', 'locales', `${locale}.json`),
				JSON.stringify(data[locale], null, '\t')
			)
		}, Promise.resolve())
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during i18nBuild', error)
		// exit the process with the error
		process.exit(error)
	}
})
