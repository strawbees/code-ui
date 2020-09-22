const generator = ({ field }, structure) => {
	let value
	if (field && field[0] && typeof field[0] === 'string') {
		value = Math.abs(Number.parseFloat(field[0]))
	} else {
		value = 0
	}
	structure.body += value
}

export default generator
