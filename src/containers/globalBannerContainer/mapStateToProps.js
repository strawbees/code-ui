import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import uiHiddenGlobalBannersSelector from 'src/selectors/uiHiddenGlobalBannersSelector'
import banners from 'static/banners.json'

export default () => createSelector(
	[
		queryLocaleSelector(),
		uiHiddenGlobalBannersSelector(),
	],
	(
		locale,
		hiddenGlobalBanners,
	) => ({
		banners : Object.keys(banners)
			.filter(id => !hiddenGlobalBanners[id])
			.filter(id => banners[id][locale])
			.map(id => ({
				id,
				...banners[id][locale],
			}))
	})
)
