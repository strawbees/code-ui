import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

export default () => createSelector(
	[
		uploaderSelector(),
	],
	(
		uploader,
	) => {
		if (uploader.current) {
			return true
		}
		return false
	}
)
