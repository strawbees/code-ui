const reportIdsSelector = () => (state) =>
	JSON.stringify(state?.simulator?.report?.ids || [])

export default reportIdsSelector
