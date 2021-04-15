import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	COMPILER_ADD_GENERATED_CODE,
	COMPILER_SET_COMPILATION_ERROR,
	COMPILER_SET_BOOTLOADER_UPDATER_HEX,
	COMPILER_SET_BOOTLOADER_UPDATER_RETRIVAL_ERROR,
	COMPILER_SET_HEX
} from 'src/constants/actionTypes'
import hashCode from 'src/utils/hashCode'

const entities = (state = {}, { type, payload }) => {
	switch (type) {
		case COMPILER_ADD_GENERATED_CODE: {
			const id = hashCode(payload)
			if (state[id] &&
				state[id].hex &&
				!state[id].error
			) {
				return state
			}
			return {
				...state,
				[id] : {
					code  : payload,
					hex   : null,
					error : null,
				}
			}
		}
		case COMPILER_SET_COMPILATION_ERROR: {
			const id = hashCode(payload.code)
			return {
				...state,
				[id] : {
					...state[id],
					hex   : null,
					error : payload.error,
				}
			}
		}
		case COMPILER_SET_HEX: {
			const id = hashCode(payload.code)
			return {
				...state,
				[id] : {
					...state[id],
					hex   : payload.hex,
					error : null,
				}
			}
		}
		default:
			return state
	}
}
const bootloaderUpdaterHex = generateReducer(COMPILER_SET_BOOTLOADER_UPDATER_HEX)
const bootloaderUpdaterRetrivalError = generateReducer(COMPILER_SET_BOOTLOADER_UPDATER_RETRIVAL_ERROR)
export default combineReducers({
	entities,
	bootloaderUpdaterHex,
	bootloaderUpdaterRetrivalError,
})
