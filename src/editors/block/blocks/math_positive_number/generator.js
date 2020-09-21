const generator = ({ field }, structure) => {
	let value
	if (field && field[0] && typeof field[0] === 'number') {
		[value] = field
	} else {
		value = 0
	}
	structure.body += value
}

export default generator
