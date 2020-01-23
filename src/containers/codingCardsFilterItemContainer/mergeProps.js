export default (stateProps, dispatchProps, ownProps) => {
	const {
		hardware,
		...otherStateProps
	} = stateProps


	return {
		...otherStateProps,
		...dispatchProps,
		...ownProps,
		title  : hardware.title,
		iconId : hardware.id,
	}
}
