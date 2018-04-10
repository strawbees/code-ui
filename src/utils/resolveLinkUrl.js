import routes from 'static/routes.json'

export default (to) => {
	let href
	let as
	if (to && routes[to]) {
		href = {
			pathname : routes[to].page,
			query    : routes[to].query
		}
		as = to
	} else if (to && routes[to.split('?')[0]]) {
		href = {
			pathname : routes[to.split('?')[0]].page,
			query    : routes[to.split('?')[0]].query
		}
		as = to
	} else {
		href = to
	}
	return {
		as,
		href
	}
}
