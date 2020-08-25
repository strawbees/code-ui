import { createSelector } from 'reselect'
import uploaderEntrySelector from 'src/selectors/uploaderEntrySelector'

const uploaderEntryErrorSelector = () => createSelector(
	[
		uploaderEntrySelector(),
	],
	(
		uploaderEntry,
	) => uploaderEntry && uploaderEntry.error
)

export default uploaderEntryErrorSelector
