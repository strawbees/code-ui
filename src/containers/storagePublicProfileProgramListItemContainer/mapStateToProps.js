import { createSelector } from 'reselect'
import storagePublicProfileFormatedProgramSelector from 'src/selectors/storagePublicProfileFormatedProgramSelector'
import storagePublicProfileProgramGeneratedCodeSelector from 'src/selectors/storagePublicProfileProgramGeneratedCodeSelector'

export default () => createSelector(
	[
		storagePublicProfileFormatedProgramSelector(),
		storagePublicProfileProgramGeneratedCodeSelector(),
	],
	(
		{
			name,
			source,
			url,
			type,
			updatedAt,
		},
		generatedCode,
	) => ({
		name,
		source,
		url,
		type,
		updatedAt,
		generatedCode,
	})
)
