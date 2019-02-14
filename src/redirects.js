export default (locationString) => {
	const {
		pathname,
		search,
		hash
	} = new URL(locationString)
	const searchHash = `${search}${hash}`

	// /reset/#/xxxxx -> /reset-password/?t=xxxxx
	if ((pathname === '/reset/' ||
		pathname === '/reset') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash
			.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		return `/reset-password/?t=${id}`
	}
	// /confirm/#/xxxxx -> /confirm-email/?t=xxxxx
	if ((pathname === '/confirm/' ||
		pathname === '/confirm') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash
			.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		return `/confirm-email/?t=${id}`
	}
	// /program/#!/xxxxx -> /flow/?p=xxxxx
	if ((pathname === '/program/' ||
		pathname === '/program') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash
			.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		return `/flow/?p=${id}`
	}
	// /program/xxxxx -> /flow/?p=xxxxx
	if (pathname.indexOf('/program/') === 0 &&
		search === '') {
		const id = pathname.replace('/program/', '')
		return `/flow/?p=${id}`
	}
	//  /flow/?p=/#!/xxxxx -> /flow/?p=xxxxx
	if (pathname.indexOf('/flow/') === 0 &&
		(searchHash.indexOf('?p=/#!/') === 0 ||
		searchHash.indexOf('?p=#!/') === 0 ||
		searchHash.indexOf('?p=#!') === 0 ||
		searchHash.indexOf('?p=/#/') === 0 ||
		searchHash.indexOf('?p=#/') === 0 ||
		searchHash.indexOf('?p=#') === 0)) {
		const id = searchHash
			.replace('?p=/#!/', '')
			.replace('?p=#!/', '')
			.replace('?p=#!', '')
			.replace('?p=/#/', '')
			.replace('?p=#/', '')
			.replace('?p=#', '')

		return `/flow/?p=${id}`
	}
	// /user/#!/xxxxx -> /user/?u=sb/xxxxx
	if ((pathname === '/user/' ||
		pathname === '/user') &&
		search === '' &&
		hash.indexOf('#' === 0)) {
		const id = hash.replace('#!/', '')
			.replace('#/', '')
			.replace('#', '')
		return `/user/?u=sb/${id}`
	}
	// /user/xxxxx -> -> /user/?u=sb/xxxxx
	if (pathname.indexOf('/user/') === 0 &&
		search === '') {
		const id = pathname.replace('/user/', '')
		return `/user/?u=sb/${id}`
	}
	return undefined
}
