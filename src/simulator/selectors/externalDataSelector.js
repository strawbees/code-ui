const internalDataNodeEntitiesSelector = () => (state) =>
	state?.simulator?.internalData.entities || []

export default internalDataNodeEntitiesSelector
