const internalDataNodeEntitiesSelector = () => (state) =>
	state?.simulator?.internalData?.nodes?.entities || {}

export default internalDataNodeEntitiesSelector
