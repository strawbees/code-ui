import { createSelector } from 'reselect'
import storagePublicProfileProgramsSelector from 'src/selectors/storagePublicProfileProgramsSelector'

const selector = () => createSelector(
	[
		storagePublicProfileProgramsSelector(),
	],
	(
		storagePublicProfilePrograms,
	) => Object.entries(storagePublicProfilePrograms)
		.sort((a, b) => {
			if (a[1].updatedAt > b[1].updatedAt) {
				return -1
			}
			return 1
		})
		.map(([id]) => id)
)

export default selector
