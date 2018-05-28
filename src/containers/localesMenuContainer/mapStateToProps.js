import { createSelector } from 'reselect'
import routesSelector from 'src/selectors/routesSelector'
import currentLocaleSelector from 'src/selectors/currentLocaleSelector'
import otherLocalesSelector from 'src/selectors/otherLocalesSelector'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import queryRefSelector from 'src/selectors/queryRefSelector'
import urlVarsStringSelector from 'src/selectors/urlVarsStringSelector'

export default () => createSelector(
	[
		currentLocaleSelector(),
		otherLocalesSelector(),
		routesSelector(),
		queryLocaleSelector(),
		queryRefSelector(),
		urlVarsStringSelector(),
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
