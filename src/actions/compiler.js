import delay from 'src/utils/delay'
import generateAction from 'src/utils/generateAction'
import tryToExecute from 'src/utils/tryToExecute'
import timeoutFetch from 'src/utils/timeoutFetch'
import compilerHexSelector from 'src/selectors/compilerHexSelector'
import {
	COMPILER_ADD_GENERATED_CODE,
	COMPILER_SET_COMPILATION_ERROR,
	COMPILER_SET_HEX,
} from 'src/constants/actionTypes'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		COMPILER_URL
	}
} = getConfig()


export const addCompilerCode = generateAction(COMPILER_ADD_GENERATED_CODE)
export const setCompilerCompilationError = generateAction(COMPILER_SET_COMPILATION_ERROR)
export const setCompilerHex = generateAction(COMPILER_SET_HEX)

const enterCompilationQueue = async (code) => {
	try {
		const response = await timeoutFetch(`${COMPILER_URL}/${window.encodeURIComponent(code)}`, {}, 15000)
		const { _id, id } = await response.json()

		if (!_id && !id) {
			throw new Error('No id')
		}
		return _id || id
	} catch (e) {
		let error
		if (e.message === 'Failed to fetch') {
			error = 'CONNECTION'
		} else if (e.name === 'AbortError') {
			error = 'TIMEOUT'
		} else if (e.name === 'SyntaxError') {
			error = 'SERVER'
		} else if (e.message === 'No id') {
			error = 'SERVER'
		} else {
			error = 'UNHANDLED'
		}
		throw new Error(error)
	}
}
const verifyCompilation = async (id) => {
	try {
		const response = await timeoutFetch(`${COMPILER_URL}/i${id}`, {}, 15000)
		const { pending, error, hex } = await response.json()
		if (pending) {
			throw new Error('PENDING')
		}
		if (error) {
			if (error !== 'ROM_MAX' && error !== 'RAM_MAX') {
				throw new Error('COMPILATION_ERROR')
			}
			throw new Error(error)
		}
		if (hex) {
			return hex
		}
		throw new Error('UNHANDLED')
	} catch (e) {
		let error
		if (e.message === 'Failed to fetch') {
			error = 'CONNECTION'
		} else if (e.name === 'AbortError') {
			error = 'TIMEOUT'
		} else if (e.name === 'SyntaxError') {
			error = 'SERVER'
		} else if (e.message === 'No id') {
			error = 'SERVER'
		} else {
			error = e.message
		}
		throw new Error(error)
	}
}
export const compileCode = (code) => async (dispatch, getState) => {
	const state = getState()
	const stateHex = compilerHexSelector()(state, { code })
	if (stateHex) {
		return
	}
	dispatch(addCompilerCode(code))
	try {
		// Enter the compilation queue and get an id
		const id = await tryToExecute(() => enterCompilationQueue(code), 5, 500)
		await delay(2000)
		// Start verifying the compilation, try several times
		const hex = await tryToExecute(async (earlyExit) => {
			try {
				const result = await verifyCompilation(id)
				return result
			} catch (error) {
				// If there is a proper compilaton error, we can call the early
				// exit, cause there's no point in waiting any further
				if (error.message === 'COMPILATION_ERROR') {
					earlyExit()
				}
				throw error
			}
		}, 5, 2000)
		dispatch(setCompilerHex({ code, hex }))
	} catch ({ message : error }) {
		dispatch(setCompilerCompilationError({ code, error }))
	}
}
