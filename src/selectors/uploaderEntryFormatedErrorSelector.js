import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import uploaderEntryErrorSelector from 'src/selectors/uploaderEntryErrorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		stateSelector(),
		uploaderEntryErrorSelector(),
	],
	(
		state,
		error,
	) => {
		if (!error) {
			return null
		}
		switch (error) {
			case 'UNHANDLED':
				return makeStringSelector(`ui.board.upload.uploader.error.${error}`)(state)
			default:
				return makeStringSelector('ui.board.upload.uploader.error.UNHANDLED')(state)
		}
	}
)
