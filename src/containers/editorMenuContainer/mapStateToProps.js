import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		queryRefSelector,
		refEditorNameSelector,
		refEditorSavedSelector,
		makeStringSelector('ui.editor.save'),
		makeStringSelector('ui.editor.share'),
		makeStringSelector('ui.editor.upload'),
	],
	(
		queryRef,
		name,
		saved,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	) => ({
		queryRef,
		name,
		saved,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	})
)
