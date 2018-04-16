import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		(_, { id }) => id,
		storageProgramsSelector,
		makeStringSelector('ui.editor.program.placeholder_name'),
	],
	(
		id,
		storagePrograms,
		placeholderName
	) => {
		const program = storagePrograms[id]
		return {
			...program,
			name : program.name || placeholderName
		}
	}
)
