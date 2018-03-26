const rmdir = require('../utils/rmdir')
const saveJson = require('../utils/saveJson')
const locales = require('../../static/locales/locales.json')

const DEFAULT_LOCALE = 'en'

module.exports = async () => {
	Object.keys(locales).forEach(async locale => {
		await rmdir(`static/locales/${locale}/computed.json`)
		/* eslint-disable global-require */
		/* eslint-disable import/no-dynamic-require */
		const base = require(`../../static/locales/${DEFAULT_LOCALE}/strings.json`)
		const current = require(`../../static/locales/${locale}/strings.json`)
		/* eslint-enable global-require */
		/* eslint-enable import/no-dynamic-require */
		const computed = {
			...base,
			...current
		}
		await saveJson(`static/locales/${locale}/computed.json`, computed)
	})
}
