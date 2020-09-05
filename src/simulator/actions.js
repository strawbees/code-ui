import generateAction from 'src/utils/generateAction'
import {
	SET_INTERNAL_DATA,
	SET_EXTERNAL_DATA,
} from './actionTypes'

export const setInternalData = generateAction(SET_INTERNAL_DATA)
export const setExternalData = generateAction(SET_EXTERNAL_DATA)
