import { createSelector } from 'reselect'
import formatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import storageProgramGeneratedCodeSelector from 'src/selectors/storageProgramGeneratedCodeSelector'

export default () => createSelector(
	[
		formatedProgramSelector(),
		storageProgramGeneratedCodeSelector(),
	],
	(
		{
			name,
			url,
			type,
			createdAt,
		},
		generatedCode,
	) => ({
		name,
		url,
		type,
		createdAt,
		generatedCode,
	})
)
