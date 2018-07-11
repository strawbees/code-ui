import { createSelector } from 'reselect'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'

export default () => createSelector(
	[
		refEditorIdSelector(),
		storageProgramsSelector()
	],
	(
		refEditorId,
		storagePrograms,
	) => {
		if (storagePrograms[refEditorId]) {
			return true
		}
		return false
	}
)
