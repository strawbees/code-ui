import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'

import {
	SET_INTERNAL_DATA,
	SET_EXTERNAL_DATA,
} from './actionTypes'

const internalData = generateReducer(SET_INTERNAL_DATA, [])
const externalData = generateReducer(SET_EXTERNAL_DATA, [])

export default combineReducers({
	internalData,
	externalData,
})
