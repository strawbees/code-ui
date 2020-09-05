const internalDataNodeIdsSelector = () => (state) =>
	JSON.stringify(state?.simulator?.internalData?.nodes?.ids || [])

export default internalDataNodeIdsSelector
