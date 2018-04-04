let RS
export const registerRemoteStorage = rs =>
	RS = rs

export const resolveClient = mode =>
	RS.strawbeescode.privateList(mode)

export const getProgram = async (mode, id) =>
	resolveClient(mode).get(id)

export const addProgram = async (mode, data) =>
	resolveClient(mode).add({
		...data,
		updated : Date.now()
	})

export const updateProgram = async (mode, id, data) =>
	resolveClient(mode).set(id, {
		...data,
		updated : Date.now()
	})

export const removeProgram = async (mode, id) =>
	resolveClient(mode).remove(id)
