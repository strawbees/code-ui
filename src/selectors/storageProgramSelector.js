import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

const storageProgramSelector = () => createSelector(
	[
		(_, { id }) => id,
		storageProgramsSelector(),
	],
	(
		id,
		storagePrograms
	) => storagePrograms[id]
)

export default storageProgramSelector
