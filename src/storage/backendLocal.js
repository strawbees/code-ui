import * as browserStorage from 'src/utils/browserStorage'

export const prefix = 'lo'

export const loadProgram = async (id) =>
	browserStorage.get('program', id)

export const resolveUsername = () => ''
