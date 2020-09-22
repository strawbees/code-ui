const generator = ({ field }, structure) => {
	let value
	if (field && field[0] && typeof field[0] === 'string') {
		value = Math.abs(Number.parseInt(field[0], 10))
	} else {
		value = 0
	}
	structure.body += `/* whole number */ ${value}`
}

export default generator
