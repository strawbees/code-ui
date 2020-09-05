const internalDataNodeIdsSelector = () => (state) =>
	JSON.stringify(state?.simulator?.internalData?.ids || [])

export default internalDataNodeIdsSelector
