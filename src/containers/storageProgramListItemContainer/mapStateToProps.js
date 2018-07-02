import { createSelector } from 'reselect'
import storageFormatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import storageProgramGeneratedCodeSelector from 'src/selectors/storageProgramGeneratedCodeSelector'

export default () => createSelector(
	[
		storageFormatedProgramSelector(),
		storageProgramGeneratedCodeSelector(),
	],
	(
		{
			name,
			url,
			type,
			updatedAt,
		},
		generatedCode,
	) => ({
		name,
		url,
		type,
		updatedAt,
		generatedCode,
	})
)
