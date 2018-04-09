import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		queryRefSelector,
		refEditorNameSelector,
		refEditorSourceSelector,
		refEditorSavedSelector,
		makeStringSelector('ui.editor.program.placeholder_name'),
		makeStringSelector('ui.editor.save'),
		makeStringSelector('ui.editor.share'),
		makeStringSelector('ui.editor.upload'),
	],
	(
		queryRef,
		name,
		source,
		saved,
		placeholderName,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	) => ({
		programNotInitialized : source === null,

		name : name || '',
		queryRef,
		saved,
		placeholderName,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	})
)
