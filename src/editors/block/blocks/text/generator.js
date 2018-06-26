export default ({ field }, structure) => {
	if (!field || !field[0]) {
		return
	}
	structure.body += `${field[0]}`
}
