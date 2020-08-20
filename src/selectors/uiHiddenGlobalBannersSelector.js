const selector = () => (state) =>
	(
		state &&
		state.ui &&
		state.ui.hiddenGlobalBanners
	) || []

export default selector
