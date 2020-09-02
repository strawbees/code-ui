import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'

import {
	SET_REPORT,
} from './actionTypes'

const report = generateReducer(SET_REPORT, [])

export default combineReducers({
	report,
})
