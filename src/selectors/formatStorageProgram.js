import makeStringSelector from 'src/selectors/makeStringSelector'

const formatDate = (ts) => {
	const d = new Date(ts)
	let month = d.getMonth() + 1
	let day = d.getDate()
	const year = d.getFullYear()

	if (month < 10) {
		month = `0${month}`
	}
	if (day < 10) {
		day = `0${day}`
	}

	return `${year}-${month}-${day}`
}

const selector = (
	state,
	{
		id,
		name,
		type,
		updatedAt,
		source,
	},
	placeholderName,
) => ({
	name      : name || placeholderName,
	url       : `${makeStringSelector(`routes.${type}`)(state)}?p=${id}`,
	updatedAt : formatDate(updatedAt),
	type,
	source,
})

export default selector
