import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

const selector = () => createSelector(
	[
		uploaderSelector(),
	],
	(
		uploader,
	) => uploader.entities
)

export default selector
