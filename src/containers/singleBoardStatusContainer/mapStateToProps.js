import { createSelector } from 'reselect'
import qbmidiLinkSelector from 'src/selectors/qbmidiLinkSelector'

export default () => createSelector(
	[
		qbmidiLinkSelector(),
	],
	({
		midi,
		uuid,
		bootloader,
		uploading,
		enteringBootloaderMode,
		exitingBootloaderMode,
	}) => ({
		uuid,
		status : !midi
			? 'problem'
			: (uploading || enteringBootloaderMode || exitingBootloaderMode)
				? 'busy'
				: bootloader
					? 'bootloader'
					: 'ok'
	})
)
