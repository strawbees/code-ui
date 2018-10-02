import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default () => createSelector(
	[
		(_, { id }) => id,
		storageProgramsSelector(),
	],
	(
		id,
		storagePrograms
	) => storagePrograms[id]
)
