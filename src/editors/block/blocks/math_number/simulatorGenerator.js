const generator = ({ field }, structure) => {
	let value
	if (field && field[0] && typeof field[0] === 'string') {
		value = Number.parseFloat(field[0])
	} else {
		value = 0
	}
	structure.body += `/* number */ ${value}`
}

export default generator
