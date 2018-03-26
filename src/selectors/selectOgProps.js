/* global CANONICAL_URL */
import s from 'src/utils/s'

const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

export default ({
	url,
	title,
	description,
	image,
	type
}, state) => ({
	og : {
		'og:url'         : url || baseUrl ? `${baseUrl}${state.asPath}` : '',
		'og:title'       : title || s('home.og.title'),
		'og:description' : description || s('home.og.description'),
		'og:image'       : image || s('home.og.image'),
		'og:type'        : type || 'website'
	}
})
