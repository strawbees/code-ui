const uiHiddenGlobalBannersSelector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.hiddenGlobalBanners
	) || []

export default uiHiddenGlobalBannersSelector
