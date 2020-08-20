import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import storagePublicProfileProgramSelector from 'src/selectors/storagePublicProfileProgramSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import formatStorageProgram from 'src/selectors/formatStorageProgram'

const selector = () => createSelector(
	[
		stateSelector(),
		storagePublicProfileProgramSelector(),
		makeStringSelector('ui.editor.program_placeholder_name'),
	],
	formatStorageProgram
)

export default selector
