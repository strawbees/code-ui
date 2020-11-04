const internalDataNodeIdsSelector = () => (state) =>
	state?.simulator?.internalData?.nodes?.ids || []

export default internalDataNodeIdsSelector
