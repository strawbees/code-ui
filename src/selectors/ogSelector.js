/* global CANONICAL_URL */
import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRef'
import makeStringSelector from 'src/selectors/makeStringSelector'

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
		'og:url'         : `${baseUrl}${refUrl}`,
		'og:title'       : title || homeTitle,
		'og:description' : description || homeDescription,
		'og:image'       : title || homeImage,
		'og:type'        : type || 'website'
	})
)

export default createSelector(
	[
		queryRefSelector,
		state => state
	],
	(
		queryRef,
		state
	) => makeRefOgSelector(queryRef)(state)
)
