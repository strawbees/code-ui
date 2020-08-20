import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

const uploaderEntitiesSelector = () => createSelector(
	[
		uploaderSelector(),
	],
	(
		uploader,
	) => uploader.entities
)

export default uploaderEntitiesSelector
