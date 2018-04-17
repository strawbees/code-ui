import { createSelector } from 'reselect'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorInitializedSelector from 'src/selectors/refEditorInitializedSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default createSelector(
	[
		refEditorNameSelector,
		refEditorSavedSelector,
		refEditorInitializedSelector,
		makeStringSelector('ui.editor.program.placeholder_name'),
		qbmidiLinksSelector
	],
	(
		name,
		saved,
		initialized,
		placeholderName,
		qbmidiLinks,
	) => ({
		name,
		saved,
		initialized,
		placeholderName,
		uploadEnabled : Object.keys(qbmidiLinks).length > 0
	})
)
