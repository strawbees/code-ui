import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

const uploaderLastErrorSelector = () => createSelector(
	[
		uploaderSelector(),
	],
	(
		uploader,
	) => uploader && uploader.lastError
)

export default uploaderLastErrorSelector
