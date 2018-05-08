import generateAction from 'src/utils/generateAction'
import {
	FLOW_EDITOR_SET_NODE_DEFINITIONS,
	FLOW_EDITOR_SET_CATEGORY_DEFINITIONS,
	FLOW_EDITOR_DISPLAY_ADVANCED_NODES,
} from 'src/constants/actionTypes'

export const setFlowEditorNodeDefinitions = generateAction(FLOW_EDITOR_SET_NODE_DEFINITIONS)
export const setFlowEditorCategoryDefinitions = generateAction(FLOW_EDITOR_SET_CATEGORY_DEFINITIONS)
export const flowEditorDisplayAdancedNodes = generateAction(FLOW_EDITOR_DISPLAY_ADVANCED_NODES)
