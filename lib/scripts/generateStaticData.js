const path = require('path')
const fs = require('fs').promises
const PO = require('pofile')
const nextConfig = require('../../next.config.js')
const rimraf = require('../utils/rimraf')

const {
	LOCALES,
	ROOT_PATH
} = nextConfig.publicRuntimeConfig

const reducePot = (acc, { msgctxt, msgid }) => {
	acc[msgctxt] = msgid
	return acc
}
const reducePo = (acc, { msgctxt, msgid, msgstr }) => {
	acc[msgctxt] = msgstr[0] || msgid
	return acc
}
const buildData = async (locales, templates) => {
	const data = await locales.reduce(async (resolution, locale, localeIndex) => {
		const acc = await resolution
		acc[locale] = await buildTemplateData(templates, locale, localeIndex)
		// load scracth-blocks data
		acc[locale]['_scracth-blocks'] = await buildScratchBlocksData(locale)
		return Promise.resolve(acc)
	}, Promise.resolve({}))
	return data
}
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
		// adjust the routes, based on the locale and ROOT_PATH
		Object.keys(templateData)
			.filter(key =>
				key.indexOf('routes.') === 0
			)
			.forEach(key =>
				templateData[key] = `${ROOT_PATH}${localeIndex === 0 ? '' : `/${locale}`}${templateData[key]}`
			)
		acc = {
			...acc,
			...templateData
		}
		return Promise.resolve(acc)
	}, Promise.resolve({}))
const buildScratchBlocksData = async (locale) =>
	JSON.parse(await fs.readFile(
		path.join('data', 'i18n', 'scratch-blocks', `${locale}.json`),
		'utf8'
	))
const generateI18nFiles = async (i18nData) => {
	// build a fresh i18n directory
	await rimraf(path.join('static', 'i18n'))
	await fs.mkdir(path.join('static', 'i18n'), { recursive : true })

	// save the i18n index
	await fs.writeFile(
		path.join('static', 'i18n', 'index.json'),
		JSON.stringify(LOCALES.map((locale, localeIndex) => ({
			id      : locale,
			name    : i18nData[locale]['locale.name'],
			default : localeIndex === 0
		})), null, '\t')
	)
	// save the i18n translations
	await LOCALES.reduce(async (resolution, locale) => {
		await resolution
		return fs.writeFile(
			path.join('static', 'i18n', `${locale}.json`),
			JSON.stringify(i18nData[locale], null, '\t')
		)
	}, Promise.resolve())
}
const generateRoutesFiles = async (i18nData) => {
	// read the routes template
	const routesTemplate = JSON.parse(
		await fs.readFile(path.join('data', 'routes.json'))
	)

	// generate the routes, making sure to append the correct query.locale
	const routes = LOCALES.reduce((acc, locale) => {
		Object.keys(routesTemplate).forEach(routeKey => {
			acc[i18nData[locale][routeKey]] = {
				...routesTemplate[routeKey],
				query : {
					...routesTemplate[routeKey].query,
					locale
				}
			}
		})
		return acc
	}, {})

	// clear the routes file
	await rimraf(path.join('static', 'routes.js'))

	// write the new file
	return fs.writeFile(
		path.join('static', 'routes.json'),
		JSON.stringify(routes, null, '\t')
	)
}

module.exports = async () => {
	// build all the data
	const i18nData = await buildData(
		LOCALES,
		(await fs.readdir(path.join('data', 'i18n', 'templates')))
			.filter(filename => filename.endsWith('.pot'))
			.map(filename => filename.replace('.pot', ''))
	)
	// generate i18n files
	await generateI18nFiles(i18nData)
	// generate route files
	await generateRoutesFiles(i18nData)
}
