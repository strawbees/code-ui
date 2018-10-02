export default ({ field }, structure) => {
	const id = field && field[0]
	const procedure = Object.values(structure.procedures).pop()
	let name = 'false'
	if (procedure) {
		const arg = procedure.filter(a => a.id === id).pop()
		if (arg) {
			// eslint-disable-next-line prefer-destructuring
			name = arg.name
		}
	}
	structure.body += name
}
