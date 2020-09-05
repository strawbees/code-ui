const internalDataEntitiesSelector = () => (state) =>
	state?.simulator?.internalData.entities || []

export default internalDataEntitiesSelector
