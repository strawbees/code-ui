import getConfig from 'next/config'
import routes from 'static/routes.json'

const {
	publicRuntimeConfig : {
		CANONICAL_URL,
	},
} = getConfig()

const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

const resolveLinkUrl = (to) => {
	let href
	let as
	to = (to || '').replace(baseUrl, '')
	if (to && routes[to]) {
		href = {
			pathname : routes[to].page,
			query    : {
				...routes[to].query,
			},
		}
		as = to
	} else if (to && routes[to.split('?')[0]]) {
		href = {
			pathname : routes[to.split('?')[0]].page,
			query    : {
				...routes[to.split('?')[0]].query,
			},
		}
		as = to
	} else {
		href = to
	}
	return {
		as,
		href,
	}
}

export default resolveLinkUrl
