import { createSelector } from 'reselect'
import routesSelector from 'src/selectors/routes'
import queryLocaleSelector from 'src/selectors/queryLocale'
import queryRefSelector from 'src/selectors/queryRef'
import urlVarsStringSelector from 'src/selectors/urlVarsString'
import currentLocaleSelector from 'src/selectors/currentLocale'
import otherLocalesSelector from 'src/selectors/otherLocales'

export default createSelector(
	[
		currentLocaleSelector,
		otherLocalesSelector,
		routesSelector,
		queryLocaleSelector,
		queryRefSelector,
		urlVarsStringSelector,
	],
	(
		currentLocale,
		otherLocales,
		routes,
		queryLocale,
		queryRef,
		urlVarsString
	) => ({
		current : {
			name : currentLocale.name
		},
		alternatives : otherLocales.map(locale => ({
			name : locale.name,
			url  : Object.keys(routes).filter(path =>
				routes[path].query.locale === locale.id
				&& routes[path].query.ref === queryRef
			).pop() + urlVarsString
		}))
	})
)
