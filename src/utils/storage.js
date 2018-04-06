let RS
let privateClient
export const registerRemoteStorage = rs => {
	RS = rs
	privateClient = RS.strawbeescode.privateList('programs')
}

export const getProgram = async (id) =>
	privateClient.get(id)

export const addProgram = async (data) =>
	privateClient.add({
		...data,
		createdAt  : Date.now(),
		modifiedAt : Date.now()
	})

export const updateProgram = async (id, data) =>
	privateClient.set(id, {
		...data,
		modifiedAt : Date.now()
	})

export const removeProgram = async (id) =>
	privateClient.remove(id)
