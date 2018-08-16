import { createSelector } from 'reselect'
import storagePublicProfileProgramsSelector from 'src/selectors/storagePublicProfileProgramsSelector'

export default () => createSelector(
	[
		(_, { id }) => id,
		storagePublicProfileProgramsSelector(),
	],
	(
		id,
		storagePublicProfilePrograms
	) => storagePublicProfilePrograms[id]
)
