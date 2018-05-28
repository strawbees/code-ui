import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

export default () => createSelector(
	[
		uploaderSelector(),
	],
	(
		uploader,
	) => uploader && uploader.lastError
)
