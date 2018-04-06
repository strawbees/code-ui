import { createSelector } from 'reselect'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default createSelector(
	[
		storageProgramsSelector
	],
	(
		storagePrograms
	) => ({
		ids : Object.entries(storagePrograms)
			.sort((a, b) => {
				if (a[1].createdAt < b[1].createdAt) {
					return -1
				}
				return 1
			})
			.map(([id]) => id)
	})
)
