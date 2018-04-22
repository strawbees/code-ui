import { createSelector } from 'reselect'
import qbmidiLinkSelector from 'src/selectors/qbmidiLinkSelector'

export default createSelector(
	[
		qbmidiLinkSelector
	],
	({
		midi,
		uploading,
		enteringBootloaderMode,
		exitingBootloaderMode
	}) => ({
		status : !midi ?
			'problem' :
			(uploading || enteringBootloaderMode || exitingBootloaderMode) ?
				'busy' :
				'ok'
	})
)
