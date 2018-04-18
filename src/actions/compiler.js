import generateAction from 'src/utils/generateAction'
import {
	COMPILER_ADD_GENERATED_CODE,
	COMPILER_SET_COMPILATION_ERROR,
	COMPILER_SET_HEX
} from 'src/constants/actionTypes'

export const addCompilerCode = generateAction(COMPILER_ADD_GENERATED_CODE)
export const setCompilerCompilationError = generateAction(COMPILER_SET_COMPILATION_ERROR)
export const setCompilerHex = generateAction(COMPILER_SET_HEX)

export const compileCode = (code) => (dispatch, getState) => {

}
