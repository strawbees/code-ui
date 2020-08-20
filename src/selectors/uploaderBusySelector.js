import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

const selector = () => createSelector(
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

export default selector
