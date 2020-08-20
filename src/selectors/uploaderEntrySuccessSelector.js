import { createSelector } from 'reselect'
import uploaderEntrySelector from 'src/selectors/uploaderEntrySelector'

const uploaderEntrySuccessSelector = () => createSelector(
	[
		uploaderEntrySelector(),
	],
	(
		uploaderEntry,
	) => uploaderEntry && uploaderEntry.success
)

export default uploaderEntrySuccessSelector
