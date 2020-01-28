import getConfig from 'next/config'
import * as browserStorage from 'src/utils/browserStorage'

const {
	publicRuntimeConfig : {
		STRAWBEES_CODE_API_URL
	}
} = getConfig()

// "Public" api
export const name = 'strawbees'
export const prefix = 'sb'

export const refreshCredentials = async (credentials) => {
	const response = await apiCall({
		url    : 'auth/token',
		method : 'post',
		data   : {
			grant_type    : 'refresh_token',
			refresh_token : credentials.refreshToken
		},
		formEncoded : true,
		headers     : {
			Authorization : 'Basic YWJjMTphc2Q=',
		},
	})
	if (!response.ok) {
		throw new Error('NOT_AUTHORIZED')
	}
	return {
		backend      : 'strawbees',
		expires      : Date.now() + response.json.expires_in * 1000,
		accessToken  : response.json.access_token,
		refreshToken : response.json.refresh_token,
	}
}

export const loadProgram = async (id) => {
	// first check if the program exists locally
	const localCopy = browserStorage.get('program', id)
	if (localCopy) {
		return localCopy
	}
	// if not, then fetch from the server
	const remoteCopy = await loadRemoteProgramById(null, { programId : id })
	return remoteCopy
}

export const loadUserPublicProfile = async (id) => {
	// remove the prefix if present
	if (id.indexOf('sb/') === 0) {
		id = id.replace('sb/', '')
	}

	// Get the user
	const user = await loadRemoteUserByUsername({}, { username : id })
	// Get a fresh copy of all the programs
	const programs = await loadRemoteProgramsByUserId({}, { userId : user.id })

	return {
		user,
		programs
	}
}

export const sync = async (
	credentials,
	{
		programs,
		remoteMirror,
	}) => {
	// The result object is is what will be returned after the sync. It contains
	// the synced mirror from the server, and it's values should be used to set
	// the storage program, user and the remoteMirror itself.
	// It also contains programIdChanges, a dictionary with program ids that had
	// to change because the server couldn't accept the initial id. For most
	// programs this is fine, simply replace the storage programs and you are
	// done. But in case the program is loaded in the current editor, you will
	// need replace it.
	const result = {
		mirror           : {},
		programIdChanges : {}
	}

	// Get a fresh copy of the user
	const remoteUser = await loadRemoteMe(credentials)
	// Get a fresh copy of all the programs
	const remotePrograms = await loadRemoteProgramsByUserId(credentials, { userId : remoteUser.id })

	// Get the inial version of the result mirror
	result.mirror.programs = JSON.parse(JSON.stringify(remotePrograms))
	result.mirror.user = JSON.parse(JSON.stringify(remoteUser))

	// create a list of all program ids
	const programIds = [...new Set([
		...Object.keys(remotePrograms),
		...Object.keys(programs)])
	]
	// iterate over all the ids
	/* eslint-disable no-continue */
	for (let i = 0; i < programIds.length; i++) {
		const id = programIds[i]
		const remoteProgram = remotePrograms[id]
		const mirrorProgram = remoteMirror.programs[id]
		const localProgram = programs[id]
		// Program doesnt exist on the server
		if (localProgram && !remoteProgram) {
			if (mirrorProgram) {
				// delete locally (no-op, since we will use the server miror)
				continue
			}
			// create on server
			const newProgram = await createRemoteProgram(credentials, localProgram)
			result.mirror.programs[newProgram.id] = newProgram
			if (localProgram.id !== newProgram.id) {
				result.programIdChanges[localProgram.id] = newProgram.id
			}
			continue
		}
		// Program doesnt exist locally
		if (remoteProgram && !localProgram) {
			if (mirrorProgram) {
				// delete on the server
				await deleteRemoteProgram(credentials, remoteProgram)
				delete result.mirror.programs[remoteProgram.id]
				continue
			}
			// create locally (no-op, since we will use the server miror)
			continue
		}
		// Program exists both on the server and locally
		if (remoteProgram.version < localProgram.version) {
			// update on server
			const updatedProgram = await updateRemoteProgram(credentials, localProgram)
			result.mirror.programs[updatedProgram.id] = updatedProgram
			if (localProgram.id !== updatedProgram.id) {
				result.programIdChanges[localProgram.id] = updatedProgram.id
			}
			continue
		}
		if (localProgram.version < localProgram.remoteProgram) {
			// update locally (no-op, since we will use the server miror)
		}
	}
	/* eslint-enable no-continue */
	return result
}

// "Private" api (only used by things that call this backend directy)
export const signup = async (values) => {
	const user = await registerRemoteUser(values)
	const credentials = await authenticateRemoteUser(values)
	return {
		credentials,
		user,
	}
}

export const signin = async (values) => {
	const credentials = await authenticateRemoteUser(values)
	const user = await loadRemoteMe(credentials)
	return {
		credentials,
		user,
	}
}

export const forgotPassword = async ({ username }) => {
	const { ok, json } = await apiCall({
		url    : 'auth/resetRequest',
		method : 'post',
		data   : {
			nickname : username
		},
		headers : {
			Authorization : 'Basic YWJjMTphc2Q='
		},
		formEncoded : true
	})

	if (!ok) {
		if (json && json.code === 'USER_NOT_FOUND') {
			throw new Error('USER_NOT_FOUND')
		}
		throw new Error('UNHADLED')
	}
	return json
}

export const resetPassword = async ({ token, password }) => {
	const { ok, json } = await apiCall({
		url    : 'auth/reset',
		method : 'post',
		data   : {
			token,
			password
		}
	})
	if (!ok) {
		throw new Error(json.code)
	}
	return json
}

export const confirmEmail = async (id) => {
	const { ok, json } = await apiCall({
		url    : `auth/confirm/${id}`,
		method : 'get',
	})
	if (!ok) {
		throw new Error(json.code)
	}
	return json
}


// Api handlers
const registerRemoteUser = async (
	{
		username,
		email,
		password,
		age,
	}) => {
	const { ok, json } = await apiCall({
		url    : 'user',
		method : 'post',
		data   : {
			// the api expects nickname, not username
			nickname  : username,
			// api expects birthdate, not age
			birthdate : (() => {
				const birth = new Date(new Date().setYear(new Date().getFullYear() - age))
				const month = birth.getUTCMonth() + 1 // months from 1-12
				const day = birth.getUTCDate()
				const year = birth.getUTCFullYear()
				return `${year}-${month}-${day}`
			})(),
			email,
			password,
		}
	})
	if (!ok) {
		if (json && json.error === 'E_VALIDATION') {
			if (json.invalidAttributes && json.invalidAttributes.nickname) {
				if (json.invalidAttributes.nickname[0] &&
					json.invalidAttributes.nickname[0].rule === 'uniqueNickname') {
					throw new Error('VALIDATION_UNIQUE_USERNAME')
				}
			}
		}
		throw new Error('UNHADLED')
	}
	return {
		username : json.nickname,
		id       : json.id,
	}
}

const authenticateRemoteUser = async ({ username, password }) => {
	const { ok, json } = await apiCall({
		url    : 'auth/token',
		method : 'post',
		data   : {
			username,
			password,
			grant_type : 'password',
		},
		headers : {
			Authorization : 'Basic YWJjMTphc2Q='
		},
		formEncoded : true
	})

	if (!ok) {
		throw new Error('UNHADLED')
	}
	return {
		backend      : 'strawbees',
		expires      : Date.now() + json.expires_in * 1000,
		accessToken  : json.access_token,
		refreshToken : json.refresh_token,
	}
}

const loadRemoteMe = async (credentials) => {
	const { ok, json } = await apiCall({
		url : 'user/me',
		credentials
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	return {
		username : json.nickname,
		id       : json.id,
	}
}

const loadRemoteUserByUsername = async (credentials, { username }) => {
	const { ok, json } = await apiCall({
		url : `user/?nickname=${username}`,
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	if (!json.length) {
		throw new Error('USER_NOT_FOUND')
	}

	return {
		username : json[0].nickname,
		id       : json[0].id,
	}
}

const loadRemoteProgramsByUserId = async (credentials, { userId }) => {
	const { ok, json } = await apiCall({
		url : `program/?author=${userId}&limit=200`,
		credentials,
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	return json.map(normalizeProgramFromApi)
		.reduce((acc, program) => {
			acc[program.id] = program
			return acc
		}, {})
}

const loadRemoteProgramById = async (credentials, { programId }) => {
	const { ok, json } = await apiCall({
		url : `program/${programId}`,
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	return normalizeProgramFromApi(json)
}

const createRemoteProgram = async (credentials, data) => {
	const { ok, json } = await apiCall({
		url    : 'program',
		method : 'post',
		data   : normalizeProgramToApi(data),
		credentials,
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	return normalizeProgramFromApi(json)
}

const updateRemoteProgram = async (credentials, data) => {
	const { ok, json } = await apiCall({
		url    : `program/${data.id}`,
		method : 'put',
		data   : normalizeProgramToApi(data),
		credentials,
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	return normalizeProgramFromApi(json)
}

const deleteRemoteProgram = async (credentials, data) => {
	const { ok, json } = await apiCall({
		url    : `program/${data.id}`,
		method : 'delete',
		credentials,
	})
	if (!ok) {
		throw new Error('UNHADLED')
	}
	return normalizeProgramFromApi(json)
}

// Helpers
const apiCall = async (
	{
		url,
		method,
		credentials,
		headers,
		data,
		formEncoded
	}) => {
	let body
	if (data) {
		if (formEncoded) {
			body = Object.keys(data).map((key) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
			).join('&')
		} else {
			body = JSON.stringify(data)
		}
	}
	headers = {
		'Content-Type' : formEncoded ?
			'application/x-www-form-urlencoded; charset=utf-8' :
			'application/json',
		Authorization : (credentials && credentials.accessToken) ?
			`Bearer ${credentials.accessToken}` :
			'',
		...headers
	}

	let response
	try {
		response = await fetch(`${STRAWBEES_CODE_API_URL}/${url}`, {
			method,
			body,
			headers
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Strawbees backend', 'apiCall', error)
		throw new Error('NETWORK')
	}

	let json
	try {
		json = await response.json()
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Strawbees backend', 'apiCall', error)
		throw new Error('SERVER')
	}

	if (!response.ok) {
		if (json && (
			json.code === 'AUTH_GRANT' ||
			json.code === 'NOT_AUTHENTICATED')) {
			throw new Error('NOT_AUTHORIZED')
		}
	}

	return {
		ok : response.ok,
		json,
	}
}

const normalizeProgramFromApi = (program) => {
	// clone
	program = JSON.parse(JSON.stringify(program))
	// resolve the type (if there is none, assume flow)
	const type = program.type || 'flow'

	// resolve the source based on the type
	let source
	if (type !== 'flow') {
		source = program.tree
	} else {
		// convert ids
		let idGenerator = -1
		const idConversionMap = {}
		program.tree.forEach(remoteInstance => {
			if (!remoteInstance.transferId) {
				remoteInstance.transferId = `${++idGenerator}_`
			}
			idConversionMap[remoteInstance.id] = remoteInstance.transferId
		})
		source = program.tree.map(remoteInstance => {
			// Convert the input array to parameters
			const parameters = {}
			const convertToParameter = (input) => {
				if (input.type === 'Output') {
					const [oldNodeId, outlet] = input.value.split('.')
					const nodeId = idConversionMap[oldNodeId]
					parameters[input.id] = `${nodeId}.${outlet}`
				} else {
					parameters[input.id] = input.value
				}
			}
			(remoteInstance.inputs || []).forEach(input => {
				if (input.children) {
					input.children.forEach(convertToParameter)
					return
				}
				convertToParameter(input)
			})
			return {
				name   : remoteInstance.id,
				nodeId : remoteInstance.node,
				x      : Number.parseInt(remoteInstance.visualX, 10),
				y      : Number.parseInt(remoteInstance.visualY, 10),
				id     : remoteInstance.transferId,
				parameters,
			}
		})
	}

	return {
		id        : program.id,
		name      : program.name,
		createdAt : (new Date(program.createdAt)).getTime(),
		updatedAt : (new Date(program.updatedAt)).getTime(),
		version   : program.version,
		type,
		source,
	}
}

const normalizeProgramToApi = (program) => {
	// clone
	program = JSON.parse(JSON.stringify(program))
	// resolve the tree based on the type
	let tree
	if (program.type !== 'flow') {
		tree = program.source
	} else {
		const idConversionMap = {}
		program.source.forEach(localInstance => {
			idConversionMap[localInstance.id] = localInstance.name
		})
		const pushValueHelper = (collection, id, value) => {
			// do some juggling to figure out if the value is 'Number',
			// 'Constant' or 'Output'
			if (Number.parseFloat(value).toString() === value ||
				Number.parseInt(value, 10).toString() === value) {
				// Number
				collection.push({
					id,
					value,
					type : 'Number'
				})
			} else if (value.split('.').length === 2) {
				// Output
				const [newNodeId, outlet] = value.split('.')
				const nodeId = idConversionMap[newNodeId]
				collection.push({
					id,
					value : `${nodeId}.${outlet}`,
					type  : 'Output'
				})
			} else {
				// Constant
				collection.push({
					id,
					value,
					type : 'Constant'
				})
			}
		}

		tree = program.source.map(localInstance => {
			// Convert the parameters to input array
			const inputs = []
			// first deal with static inputs
			const dynamicInputs = {}
			Object.keys(localInstance.parameters || {}).forEach(id => {
				const value = localInstance.parameters[id]
				// Check if we are dealing with a dynamic paramener
				if (id.split('.').length === 2) {
					const [parameter] = id.split('.')
					if (!dynamicInputs[parameter]) {
						dynamicInputs[parameter] = {
							id       : parameter,
							children : []
						}
					}
					pushValueHelper(
						dynamicInputs[parameter].children,
						id,
						value
					)
					return
				}
				pushValueHelper(
					inputs,
					id,
					value
				)
			})
			// then the dynamic inputs
			Object.keys(dynamicInputs).forEach(id => {
				const paramenter = dynamicInputs[id]
				inputs.push(paramenter)
			})

			return {
				transferId : localInstance.id,
				id         : localInstance.name,
				node       : localInstance.nodeId,
				visualX    : localInstance.x,
				visualY    : localInstance.y,
				inputs,
			}
		})
	}

	return {
		apiVersion : '0',
		original   : '',
		id         : program.id,
		name       : program.name,
		version    : program.version,
		createdAt  : (new Date(program.createdAt)).toISOString(),
		updatedAt  : (new Date(program.updatedAt)).toISOString(),
		type       : program.type,
		tree,
	}
}
