import s from 'src/selectors/selectString'

export default ({
	url,
	title,
	description,
	image,
	type
}, state) => ({
	og : {
		'og:url'         : url,
		'og:title'       : title || s('home.og.title', state),
		'og:description' : description || s('home.og.description', state),
		'og:image'       : image || s('home.og.image', state),
		'og:type'        : type || 'website'
	}
})
