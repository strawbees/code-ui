import { createSelector } from 'reselect'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		storageProgramSelector,
		makeStringSelector('ui.editor.program.placeholder_name'),
	],
	(
		storageProgram,
		placeholderName
	) => ({
		...storageProgram,
		name : storageProgram.name || placeholderName
	})
)
