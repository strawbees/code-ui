import { createSelector } from 'reselect'
import qbmidiLinkSelector from 'src/selectors/qbmidiLinkSelector'

export default createSelector(
	[
		qbmidiLinkSelector
	],
	({
		runtimeId,
		midi,
		uploading,
		enteringBootloaderMode,
		exitingBootloaderMode
	}) => ({
		id     : runtimeId,
		status : !midi ?
			'problem' :
			(uploading || enteringBootloaderMode || exitingBootloaderMode) ?
				'busy' :
				'ok'
	})
)
