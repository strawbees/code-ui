import { createSelector } from 'reselect'
import uploaderEntrySelector from 'src/selectors/uploaderEntrySelector'

const selector = () => createSelector(
	[
		uploaderEntrySelector(),
	],
	(
		uploaderEntry,
	) => uploaderEntry && uploaderEntry.error
)

export default selector
