export default (targetType, defaultState = null) =>
	(state = defaultState, { type, payload }) => {
		switch (type) {
			case targetType: {
				return payload
			}
			default:
				return state
		}
	}
