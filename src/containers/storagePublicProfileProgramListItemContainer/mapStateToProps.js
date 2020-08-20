import { createSelector } from 'reselect'
import storagePublicProfileFormatedProgramSelector from 'src/selectors/storagePublicProfileFormatedProgramSelector'
import storagePublicProfileProgramGeneratedCodeSelector from 'src/selectors/storagePublicProfileProgramGeneratedCodeSelector'

const mapStateToProps = () => createSelector(
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

export default mapStateToProps
