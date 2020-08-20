import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import formatStorageProgram from 'src/selectors/formatStorageProgram'

const storageFormatedProgramSelector = () => createSelector(
	[
		stateSelector(),
		storageProgramSelector(),
		makeStringSelector('ui.editor.program_placeholder_name'),
	],
	formatStorageProgram
)

export default storageFormatedProgramSelector
