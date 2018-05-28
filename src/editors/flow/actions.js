import generateAction from 'src/utils/generateAction'
import instanceNodeCodeNameSelector from 'src/editors/flow/selectors/instanceNodeCodeNameSelector'
import nodeCodeNameSelector from 'src/editors/flow/selectors/nodeCodeNameSelector'
import instanceSelector from 'src/editors/flow/selectors/instanceSelector'
import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	SET_NODE_DEFINITIONS,
	SET_CATEGORY_DEFINITIONS,
	SET_DISPLAY_ADVANCED_NODES,
	TOGGLE_FOLDED_CATEGORY,
	REGISTER_GET_DROP_AREA_RECT,
	SET_SOURCE,
	ADD_INSTANCE,
	REMOVE_INSTANCE,
	UPDATE_INSTANCE_ID,
	UPDATE_INSTANCE_POSITION,
} from './actionTypes'

export const setNodeDefinitions = generateAction(SET_NODE_DEFINITIONS)
export const setCategoryDefinitions = generateAction(SET_CATEGORY_DEFINITIONS)
export const setDisplayAdancedNodes = generateAction(SET_DISPLAY_ADVANCED_NODES)
export const toggleFoldedCategory = generateAction(TOGGLE_FOLDED_CATEGORY)
export const registerGetDropAreaRect = generateAction(REGISTER_GET_DROP_AREA_RECT)
export const setSource = generateAction(SET_SOURCE)
export const addInstance = generateAction(ADD_INSTANCE)
export const removeInstance = generateAction(REMOVE_INSTANCE)
export const updateInstanceId = generateAction(UPDATE_INSTANCE_ID)
export const updateInstancePosition = generateAction(UPDATE_INSTANCE_POSITION)
export const safeAddInstance = ({
	id,
	nodeId,
	x = 0,
	y = 0
}) => async (dispatch, getState) => {
	const state = getState()
	if (id) {
		id = sanitizeCPPVariableName(id)
	}
	if (!id || instanceSelector()(state, { id })) {
		let base = nodeCodeNameSelector()(state, { id : nodeId })
		base = base.charAt(0).toLowerCase() + base.slice(1)
		base = sanitizeCPPVariableName(base)
		let count = 1
		id = `${base}${count}`
		while (instanceSelector()(state, { id })) {
			count++
			id = `${base}${count}`
		}
	}
	dispatch(addInstance({
		id,
		nodeId,
		x,
		y
	}))
}

export const safeUpdateInstanceId = ({
	id,
	newId
}) => async (dispatch, getState) => {
	const state = getState()
	if (newId) {
		newId = sanitizeCPPVariableName(newId)
	}
	if (newId === id) {
		return
	}
	if (!newId) {
		let base = instanceNodeCodeNameSelector()(state, { id })
		base = base.charAt(0).toLowerCase() + base.slice(1)
		base = sanitizeCPPVariableName(base)
		let count = 1
		newId = `${base}${count}`
		while (instanceSelector()(state, { id : newId })) {
			count++
			newId = `${base}${count}`
		}
	}
	if (instanceSelector()(state, { id : newId })) {
		const base = newId
		let count = 1
		newId = `${base}${count}`
		while (instanceSelector()(state, { id : newId })) {
			count++
			newId = `${base}${count}`
		}
	}
	dispatch(updateInstanceId({
		id,
		newId
	}))
}
