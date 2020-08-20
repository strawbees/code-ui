import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

const selector = () => createSelector(
	[
		(_, { id }) => id,
		storageProgramsSelector(),
	],
	(
		id,
		storagePrograms
	) => storagePrograms[id]
)

export default selector
