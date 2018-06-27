import baseGenerateUniqueId from 'src/utils/generateUniqueId'
import * as backendLocal from './backendLocal'

const backends = {
	local : backendLocal,
	// strawbees : backendStrawbees,
	// gdrive    : backendGDrive,
	// dropbox   : backendDropbox,
	// github    : backendGithub,
}

export const resolveBackend = (credentials) => {
	if (!credentials) {
		return backendLocal
	}
	// TODO: properly resolve the credentials
	throw new Error(`Cannot resolve backend for: ${credentials}`)
}

export const generateUniqueId = (credentials) => {
	const backend = resolveBackend(credentials)
	return `${backend.prefix}${baseGenerateUniqueId()}`
}

export const resolveBackendFromId = (id) => {
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

export const loadProgram = async (id) => {
	const backend = resolveBackendFromId(id)
	return backend.loadProgram(id)
}

export const isIdValid = (id) => {
	if (resolveBackendFromId(id)) {
		return true
	}
	return false
}
