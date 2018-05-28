import { createSelector } from 'reselect'
import formatedProgramSelector from 'src/selectors/formatedProgramSelector'
import storageProgramGeneratedCodeSelector from 'src/selectors/storageProgramGeneratedCodeSelector'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'
import uploadEnabledSelector from 'src/selectors/uploadEnabledSelector'

export default () => createSelector(
	[
		formatedProgramSelector(),
		storageProgramGeneratedCodeSelector(),
		qbmidiLinksSelector(),
		uploadEnabledSelector(),
	],
	(
		formatedProgram,
		storageProgramGeneratedCode,
		qbmidiLinks,
		uploadEnabled,
	) => ({
		uploadEnabled,
		generatedCode : storageProgramGeneratedCode,
		name          : formatedProgram.name,
		type          : formatedProgram.type,
		createdAt     : formatedProgram.createdAt.toString(),
	})
)
