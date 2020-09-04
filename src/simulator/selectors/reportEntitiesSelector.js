const reportEntitiesSelector = () => (state) =>
	state?.simulator?.report.entities || []

export default reportEntitiesSelector
