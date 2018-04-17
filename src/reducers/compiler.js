import { combineReducers } from 'redux'
import {
	COMPILER_ADD_GENERATED_CODE,
	COMPILER_SET_COMPILATION_ERROR,
	COMPILER_SET_HEX
} from 'src/constants/actionTypes'


const entities = (state = {}, { type, payload }) => {
	switch (type) {
		case COMPILER_ADD_GENERATED_CODE:
			if (state[payload.code] &&
				state[payload.code].hex &&
				!state[payload.code].error
			) {
				return state
			}
			return {
				...state,
				[payload.code] : {
					code  : [payload.code],
					hex   : null,
					error : null,
				}
			}
		case COMPILER_SET_COMPILATION_ERROR:
			return {
				...state,
				[payload.code] : {
					...state[payload.code],
					hex   : null,
					error : payload.error,
				}
			}
		case COMPILER_SET_HEX:
			return {
				...state,
				[payload.code] : {
					...state[payload.code],
					hex   : payload.hex,
					error : null,
				}
			}
		default:
			return state
	}
}

export default combineReducers({
	entities
})
