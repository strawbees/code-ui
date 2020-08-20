import { createSelector } from 'reselect'
import uploaderEntrySelector from 'src/selectors/uploaderEntrySelector'

const selector = () => createSelector(
	[
		uploaderEntrySelector(),
	],
	(
		uploaderEntry,
	) => uploaderEntry && uploaderEntry.success
)

export default selector
