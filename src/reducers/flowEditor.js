import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	FLOW_EDITOR_SET_NODE_DEFINITIONS,
	FLOW_EDITOR_SET_CATEGORY_DEFINITIONS,
	FLOW_EDITOR_DISPLAY_ADVANCED_NODES,
} from 'src/constants/actionTypes'

const displayAdvancedNodes = generateReducer(FLOW_EDITOR_DISPLAY_ADVANCED_NODES, false)
const definitions = combineReducers({
	nodes      : generateReducer(FLOW_EDITOR_SET_NODE_DEFINITIONS, null),
	categories : generateReducer(FLOW_EDITOR_SET_CATEGORY_DEFINITIONS, null),
})

export default combineReducers({
	displayAdvancedNodes,
	definitions,
})
