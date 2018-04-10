import { createSelector } from 'reselect'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorInitializedSelector from 'src/selectors/refEditorInitializedSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		refEditorNameSelector,
		refEditorSavedSelector,
		refEditorInitializedSelector,
		makeStringSelector('ui.editor.program.placeholder_name'),
		makeStringSelector('ui.editor.save'),
		makeStringSelector('ui.editor.share'),
		makeStringSelector('ui.editor.upload'),
	],
	(
		name,
		saved,
		initialized,
		placeholderName,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	) => ({
		name,
		saved,
		initialized,
		placeholderName,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	})
)
