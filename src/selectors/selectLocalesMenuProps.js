export default ({
	locales,
	routes,
	query,
	asPath,
	urlVars
}) => ({
	localesMenu : {
		current : {
			title : locales[query.locale],
			url   : asPath
		},
		alternatives : Object.keys(locales)
			// remove the current locale from the list
			.filter(locale => locale !== query.locale)
			.map(locale => {
				const title = locales[locale]
				// Find path that matches the current ref
				let url = Object.keys(routes).filter(path =>
					routes[path].query.locale === locale
					&& routes[path].query.ref === query.ref
				).pop()
				// Add url vars
				if (urlVars) {
					const totalUrlVars = Object.keys(urlVars).length
					if (totalUrlVars) {
						url += Object.keys(urlVars).reduce(
							(queryString, key, index) =>
								`${queryString}${key}=${urlVars[key]}${index !== (totalUrlVars - 1) ? '&' : ''}`,
							'?'
						)
					}
				}
				return {
					title,
					url
				}
			})
	}
})
