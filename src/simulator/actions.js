import generateAction from 'src/utils/generateAction'
import {
	SET_INTERNAL_DATA,
	SET_EXTERNAL_DATA,
	SET_EXTERNAL_NODE_DATA,
	SHOW_SIMULATOR,
	HIDE_SIMULATOR,
} from './actionTypes'

export const setInternalData = generateAction(SET_INTERNAL_DATA)
export const setExternalData = generateAction(SET_EXTERNAL_DATA)
export const setExternalNodeData = generateAction(SET_EXTERNAL_NODE_DATA)

export const showSimulator = generateAction(SHOW_SIMULATOR)
export const hideSimulator = generateAction(HIDE_SIMULATOR)
