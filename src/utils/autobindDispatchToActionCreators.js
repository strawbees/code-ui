import { bindActionCreators } from 'redux'

const autobindDispatchToActionCreators =  (actionCreators) => (dispatch) =>
	Object.keys(actionCreators).reduce((acc, name) => {
		acc[name] = bindActionCreators(actionCreators[name], dispatch)
		return acc
	}, {})

export default autobindDispatchToActionCreators
