import baseGenerateUniqueId from 'src/utils/generateUniqueId'
import * as backendLocal from './backendLocal'
import * as backendStrawbees from './backendStrawbees'

const backends = {
	[backendLocal.name]     : backendLocal,
	[backendStrawbees.name] : backendStrawbees,
	// gdrive    : backendGDrive,
	// dropbox   : backendDropbox,
	// github    : backendGithub,
}

export const resolveBackendFromBackendName = (name) => {
	if (!name || !backends[name]) {
		return backends.local
	}
	return backends[name]
}

export const resolveBackendFromCredentials = (credentials) => {
	if (!credentials) {
		return backends.local
	}
	if (credentials.backend === 'strawbees') {
		return backends.strawbees
	}
	// TODO: properly resolve the credentials
	throw new Error(`Cannot resolve backend for: ${credentials}`)
}

export const generateUniqueId = (credentials) => {
	const backend = resolveBackendFromCredentials(credentials)
	return `${backend.prefix}${baseGenerateUniqueId()}`
}

export const resolveBackendFromProgramId = (id) => {
	id = id ? id.toString() : ''
	const prefix = id.substring(0, 2)
	if (id.length === 18) {
		return Object.values(backends)
			.filter(b => b.prefix === prefix)
			.pop() || null
	}
	// In case we don't match any backend by prefix, we still try to match to
	// the legacy strawbees ids (mongo object ids)
	if (id.length === 24) {
		return backends.strawbees || null
	}

	return null
}

export const resolveBackendFromUserId = (id) => {
	id = id.toString()
	const prefix = id.substring(0, 3)
	let backend = Object.values(backends)
		.filter(b => `${b.prefix}/` === prefix)
		.pop() || null

	// Fallback to strawbees
	if (!backend && id.indexOf('/') === -1) {
		backend = backends.strawbees
	}
	return backend
}

export const loadProgram = async (id) => {
	const backend = resolveBackendFromProgramId(id)
	return backend.loadProgram(id)
}

export const loadUserPublicProfile = async (id) => {
	const backend = resolveBackendFromUserId(id)
	return backend.loadUserPublicProfile(id)
}

export const isProgramIdValid = (id) => {
	if (resolveBackendFromProgramId(id)) {
		return true
	}
	return false
}

export const isUserIdValid = (id) => {
	if (resolveBackendFromUserId(id)) {
		return true
	}
	return false
}
