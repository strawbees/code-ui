const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		setExternalNodeData,
		...otherDispatchProps
	} = dispatchProps
	const {
		id,
		...otherOwnProps
	} = ownProps
	return {
		...stateProps,
		...otherDispatchProps,
		...otherOwnProps,
		setData : (data) => setExternalNodeData({ id, data }),
	}
}

export default mergeProps
