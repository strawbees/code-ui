export default (state) =>
	(
		state &&
		state.flowEditor &&
		state.flowEditor.taxonomy &&
		state.flowEditor.taxonomy.categories
	) || {}
