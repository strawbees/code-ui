const selector = () => (state) =>
	(
		state &&
		state.uploader
	) || {}

export default selector
