export default ({
	locales,
	routes,
	query,
	asPath
}) => ({
	localesMenu : {
		current : {
			title : locales[query.locale],
			url   : asPath
		},
		alternatives : Object.keys(locales)
			// remove the current locale from the list
			.filter(locale => locale !== query.locale)
			.map(locale => ({
				title : locales[locale],
				// Find path that matches the current ref
				url   : Object.keys(routes).filter(url =>
					routes[url].query.locale === locale
					&& routes[url].query.ref === query.ref
				).pop()
			}))
	}
})
