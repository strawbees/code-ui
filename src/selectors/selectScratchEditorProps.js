export default state => ({
	scratchEditor : {
		key : `${state.query.locale}_${state.urlVars && state.urlVars.p}`,
		state
	}
})
