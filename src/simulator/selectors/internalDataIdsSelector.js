const internalDataIdsSelector = () => (state) =>
	JSON.stringify(state?.simulator?.internalData?.ids || [])

export default internalDataIdsSelector
