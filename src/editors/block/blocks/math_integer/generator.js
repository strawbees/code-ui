const generator = ({ field }, structure) => {
	let value
	if (field && field[0] && typeof field[0] === 'string') {
		value = Number.parseInt(field[0], 10)
	} else {
		value = 0
	}
	structure.body += `${value}/* integer */`
}

export default generator
