import { createSelector } from 'reselect'
import uploaderEntrySelector from 'src/selectors/uploaderEntrySelector'

export default createSelector(
	[
		uploaderEntrySelector
	],
	(
		uploaderEntry
	) => uploaderEntry && uploaderEntry.success
)
