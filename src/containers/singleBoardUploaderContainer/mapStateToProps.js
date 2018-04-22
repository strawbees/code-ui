import { createSelector } from 'reselect'
import qbmidiLinkSelector from 'src/selectors/qbmidiLinkSelector'

export default createSelector(
	[
		qbmidiLinkSelector
	],
	({
		uuid,
		midi,
		bootloader,
		uploading,
	}) => ({
		uuid,
		midi,
		bootloader,
		uploading,
	})
)
