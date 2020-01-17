import { sanitizeCPPVariableName } from 'src/utils/string'

export default ({ field }, structure) => {
	if (!field || !field[0]) {
		return
	}
	structure.body += sanitizeCPPVariableName(`${field[0]}`)
}
