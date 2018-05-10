import generateAction from 'src/utils/generateAction'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY,
	REGISTER_GET_DROP_AREA_RECT,
	SET_SOURCE,
	ADD_INSTANCE,
	REMOVE_INSTANCE,
} from './actionTypes'

export const setNodeDefinitions = generateAction(SET_NODE_DEFINITIONS)
export const setCategoryDefinitions = generateAction(SET_CATEGORY_DEFINITIONS)
export const setDisplayAdancedNodes = generateAction(SET_DISPLAY_ADVANCED_NODES)
export const toggleFoldedCategory = generateAction(TOGGLE_FOLDED_CATEGORY)
export const registerGetDropAreaRect = generateAction(REGISTER_GET_DROP_AREA_RECT)
export const setSource = generateAction(SET_SOURCE)

export const createAndAddInstance = ({
	nodeId,
	x = 0,
	y = 0
}) => async (dispatch, getState) => {
	const state = getState()

	dispatch(addNode({

	}))
}
export const addInstance = generateAction(ADD_INSTANCE)
export const removeInstance = generateAction(REMOVE_INSTANCE)
