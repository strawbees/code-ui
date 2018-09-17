import * as browserStorage from 'src/utils/browserStorage'

export const name = 'local'

export const prefix = 'lo'

export const refreshCredentials = async (credentials) => credentials

export const loadProgram = async (id) => browserStorage.get('program', id)

/**
* sync
* just forward the user and the programs
*/
export const sync = async (credentials, data) => {
	const result = {
		mirror           : data,
		programIdChanges : {}
	}
	return result
}
