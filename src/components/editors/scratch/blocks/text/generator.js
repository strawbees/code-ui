export default ({ FIELD }, structure) => {
	if (!FIELD || !FIELD[0]) {
		return
	}
	structure.body += `${FIELD[0]}`
}
