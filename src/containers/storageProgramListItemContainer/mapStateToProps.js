import { createSelector } from 'reselect'
import storageFormatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import storageProgramGeneratedCodeSelector from 'src/selectors/storageProgramGeneratedCodeSelector'

const mapStateToProps = () => createSelector(
	[
		storageFormatedProgramSelector(),
		storageProgramGeneratedCodeSelector(),
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
