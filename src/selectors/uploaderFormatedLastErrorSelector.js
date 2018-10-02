import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import uploaderLastErrorSelector from 'src/selectors/uploaderLastErrorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		stateSelector(),
		uploaderLastErrorSelector(),
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
