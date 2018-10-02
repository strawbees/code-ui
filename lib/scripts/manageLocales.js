const rmdir = require('../utils/rmdir')
const mkdir = require('../utils/mkdir')
const saveJson = require('../utils/saveJson')
const locales = require('../../locales/index.json')

module.exports = async () => {
	await rmdir('static/locales')
	await mkdir('static/locales')
	await saveJson('static/locales/index.json', locales)
	locales.forEach(async ({ id, fallback }) => {
		const fallbackLocale = locales.filter(
			locale => locale.id === fallback
		).pop()

		/* eslint-disable global-require */
		/* eslint-disable import/no-dynamic-require */
		const base = fallbackLocale ? require(`../../locales/${fallbackLocale.id}.json`) : {}
		const current = require(`../../locales/${id}.json`)
		/* eslint-enable global-require */
		/* eslint-enable import/no-dynamic-require */
		const computed = {
			...base,
			...current
		}
		await saveJson(`static/locales/${id}.json`, computed)
	})
}
