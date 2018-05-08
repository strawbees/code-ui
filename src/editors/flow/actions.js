import generateAction from 'src/utils/generateAction'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY
} from './actionTypes'

export const setNodeDefinitions = generateAction(SET_NODE_DEFINITIONS)
export const setCategoryDefinitions = generateAction(SET_CATEGORY_DEFINITIONS)
export const setDisplayAdancedNodes = generateAction(SET_DISPLAY_ADVANCED_NODES)
export const toggleFoldedCategory = generateAction(TOGGLE_FOLDED_CATEGORY)
