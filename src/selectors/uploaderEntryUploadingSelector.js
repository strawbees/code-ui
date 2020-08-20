import { createSelector } from 'reselect'
import uploaderEntrySelector from 'src/selectors/uploaderEntrySelector'
import uploaderEntryErrorSelector from 'src/selectors/uploaderEntryErrorSelector'
import uploaderEntrySuccessSelector from 'src/selectors/uploaderEntrySuccessSelector'

const selector = () => createSelector(
	[
		uploaderEntrySelector(),
		uploaderEntryErrorSelector(),
		uploaderEntrySuccessSelector(),
	],
	(
		entry,
		error,
		success,
	) => {
		if (entry) {
			return !error && !success
		}
		return false
	}
)

export default selector
