import { createSelector } from 'reselect'
import uploaderSelector from 'src/selectors/uploaderSelector'

const uploaderBusySelector = () => createSelector(
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

export default uploaderBusySelector
