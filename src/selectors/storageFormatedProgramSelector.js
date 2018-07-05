import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
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

export default () => createSelector(
	[
		stateSelector(),
		storageProgramSelector(),
		makeStringSelector('ui.editor.program_placeholder_name'),
	],
	(
		state,
		{
			id,
			name,
			type,
			updatedAt,
		},
		placeholderName,
	) => ({
		name      : name || placeholderName,
		url       : `${makeStringSelector(`${type}.url`)(state)}?p=${id}`,
		updatedAt : formatDate(updatedAt),
		type,
	})
)
