import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL
	}
} = getConfig()
const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

const makeRefOgSelector = (ref) => createSelector(
	[
		makeStringSelector(`${ref}.url`),
		makeStringSelector(`${ref}.og.title`),
		makeStringSelector(`${ref}.og.description`),
		makeStringSelector(`${ref}.og.image`),
		makeStringSelector(`${ref}.og.type`),
		makeStringSelector('home.og.title'),
		makeStringSelector('home.og.description'),
		makeStringSelector('home.og.image')
	],
	(
		refUrl,
		title,
		description,
		image,
		type,
		homeTitle,
		homeDescription,
		homeImage
	) => ({
		ogUrl         : `${baseUrl}${refUrl}`,
		ogTitle       : title || homeTitle,
		ogDescription : description || homeDescription,
		ogImage       : image || homeImage,
		ogType        : type || 'website'
	})
)

export default () => createSelector(
	[
		queryRefSelector(),
		state => state,
	],
	(
		queryRef,
		state,
	) => makeRefOgSelector(queryRef)(state)
)
