let RS
let privateClient
export const registerRemoteStorage = rs => {
	RS = rs
	privateClient = RS.strawbeescode.privateList('programs')
}

export const getProgram = async (id) =>
	privateClient.get(id)

export const addProgram = async (type, name, source) =>
	privateClient.add({
		type,
		name,
		source,
		createdAt  : Date.now(),
		modifiedAt : Date.now()
	})

export const updateProgram = async (id, name, source) => {
	const program = await getProgram(id)
	return privateClient.set(id, {
		...program,
		name,
		source,
		modifiedAt : Date.now()
	})
}

export const updateProgramName = async (id, name) => {
	const program = await getProgram(id)
	return privateClient.set(id, {
		...program,
		name,
		modifiedAt : Date.now()
	})
}

export const updateProgramSource = async (id, source) => {
	const program = await getProgram(id)
	return privateClient.set(id, {
		...program,
		source,
		modifiedAt : Date.now()
	})
}


export const removeProgram = async (id) =>
	privateClient.remove(id)
