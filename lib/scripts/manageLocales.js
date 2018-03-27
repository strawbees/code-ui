const rmdir = require('../utils/rmdir')
const saveJson = require('../utils/saveJson')
const locales = require('../../static/locales/locales.json')

module.exports = async () => {
	locales.forEach(async ({ id, fallback }) => {
		const fallbackLocale = locales.filter(
			locale => locale.id === fallback
		).pop()

		await rmdir(`static/locales/${id}/computed.json`)
		/* eslint-disable global-require */
		/* eslint-disable import/no-dynamic-require */
		const base = fallbackLocale ? require(`../../static/locales/${fallbackLocale.id}/strings.json`) : {}
		const current = require(`../../static/locales/${id}/strings.json`)
		/* eslint-enable global-require */
		/* eslint-enable import/no-dynamic-require */
		const computed = {
			...base,
			...current
		}
		await saveJson(`static/locales/${id}/computed.json`, computed)
	})
}
