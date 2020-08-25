import { sanitizeCPPVariableName } from 'src/utils/string'

const generator = ({ field }, structure) => {
	if (!field || !field[0]) {
		return
	}
	structure.body += sanitizeCPPVariableName(`${field[0]}`)
}

export default generator
