import { createSelector } from 'reselect'
import storagePublicProfileProgramsSelector from 'src/selectors/storagePublicProfileProgramsSelector'

const selector = () => createSelector(
	[
		(_, { id }) => id,
		storagePublicProfileProgramsSelector(),
	],
	(
		id,
		storagePublicProfilePrograms
	) => storagePublicProfilePrograms[id]
)

export default selector
