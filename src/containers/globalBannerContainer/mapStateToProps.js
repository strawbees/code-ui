import { createSelector } from 'reselect'
import getConfig from 'next/config'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import uiHiddenGlobalBannersSelector from 'src/selectors/uiHiddenGlobalBannersSelector'
import banners from 'static/banners.json'

const {
	publicRuntimeConfig : {
		CONFIG,
	},
} = getConfig()

const mapStateToProps = () => createSelector(
	[
		queryLocaleSelector(),
		uiHiddenGlobalBannersSelector(),
	],
	(
		locale,
		hiddenGlobalBanners,
	) => ({
		banners : Object.keys(banners)
			.filter(id => !banners[id].configs || banners[id].configs.indexOf(CONFIG) !== -1)
			.filter(id => !hiddenGlobalBanners[id])
			.filter(id => banners[id].content[locale])
			.map(id => ({
				id,
				...banners[id].content[locale],
			})),
	})
)

export default mapStateToProps
