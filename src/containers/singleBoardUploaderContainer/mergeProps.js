const mergeProps = (stateProps, dispatchProps, ownProps) => {
	const {
		uploadMutipleHexes,
		...otherDispatchProps
	} = dispatchProps
	const {
		runtimeId,
		hex,
		hexes,
	} = ownProps
	return {
		...stateProps,
		...otherDispatchProps,
		...ownProps,
		onUploadPress : () => {
			let allHexes = []
			if (hex) allHexes.push(hex)
			if (hexes && hexes.length) {
				allHexes = allHexes.concat(hexes)
			}
			uploadMutipleHexes(runtimeId, allHexes, true)
		}
	}
}

export default mergeProps
