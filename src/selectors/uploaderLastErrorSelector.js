import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

const selector = () => createSelector(
	[
		uploaderSelector(),
	],
	(
		uploader,
	) => uploader && uploader.lastError
)

export default selector
