const dropAreaRectGetterSelector = () => (state) =>
	state &&
	state.flowEditor &&
	state.flowEditor.getDropAreaRect

export default dropAreaRectGetterSelector
