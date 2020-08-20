const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		flowEntry,
		blockEntry,
		...otherStateProps
	} = stateProps
	const {
		type,
		onClick,
		id,
		...otherOwnProps
	} = ownProps

	let entry
	switch (type) {
		case 'flow':
			entry = flowEntry
			break
		case 'block':
			entry = blockEntry
			break
		default:
			entry = null
	}

	return {
		...otherStateProps,
		...dispatchProps,
		...otherOwnProps,
		...entry,
		onClick,
	}
}

export default mergeProps
