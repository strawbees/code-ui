import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		STRAWBEES_CODE_API_URL
	}
} = getConfig()

export const prefix = 'sb'

export const loadProgram = async (id) => {}

export const createUser = async ({
	username,
	email,
	password,
	birthdate
}) => {
	// the api expects nickname, not username
	const data = {
		nickname : username,
		email,
		password,
		birthdate,
	}
	let response
	try {
		response = await fetch(`${STRAWBEES_CODE_API_URL}/user`, {
			method : 'post',
			body   : JSON.stringify(data)
		})
	} catch (error) {
		throw new Error('NETWORK')
	}

	let results
	try {
		results = await response.json()
	} catch (error) {
		throw new Error('SERVER')
	}

	if (!response.ok) {
		if (results.error === 'E_VALIDATION') {
			if (results.invalidAttributes && results.invalidAttributes.nickname) {
				if (results.invalidAttributes.nickname[0] &&
					results.invalidAttributes.nickname[0].rule === 'uniqueNickname') {
					throw new Error('VALIDATION_UNIQUE_USERNAME')
				}
			}
		}
		throw new Error('UNHADLED')
	}
	return results
}
