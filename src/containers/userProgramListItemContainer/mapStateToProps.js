import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default createSelector(
	[
		(_, { id }) => id,
		storageProgramsSelector
	],
	(
		id,
		storagePrograms
	) => ({
		name      : storagePrograms[id].name,
		type      : storagePrograms[id].type,
		createdAt : storagePrograms[id].createdAt.toString()
	})
)
