import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default () => createSelector(
	[
		storageProgramsSelector(),
	],
	(
		storagePrograms,
	) => Object.entries(storagePrograms)
		.sort((a, b) => {
			if (a[1].updatedAt > b[1].updatedAt) {
				return -1
			}
			return 1
		})
		.map(([id]) => id)
)
