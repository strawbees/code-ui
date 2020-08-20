const uploaderSelector = () => (state) =>
	(
		state &&
		state.uploader
	) || {}

export default uploaderSelector
