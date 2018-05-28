import { createSelector } from 'reselect'
import uploaderEntryErrorSelector from 'src/selectors/uploaderEntryErrorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		uploaderEntryErrorSelector(),
		makeStringSelector('ui.upload.error.unhandled'),
	],
	(
		error,
		unhandledError,
	) => {
		if (!error) {
			return null
		}
		switch (error) {
			case 'UNHANDLED':
			default:
				return unhandledError
		}
	}
)
