import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		queryRefSelector,
		refEditorNameSelector,
		refEditorSourceSelector,
		refEditorIdSelector,
		makeStringSelector('ui.editor.program.placeholder_name'),
		makeStringSelector('ui.editor.save'),
		makeStringSelector('ui.editor.share'),
		makeStringSelector('ui.editor.upload'),
	],
	(
		queryRef,
		name,
		source,
		id,
		placeholderName,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	) => ({
		notInitialized : source === null,
		name           : name || '',
		saved          : id !== null,
		id,
		source,
		queryRef,
		placeholderName,
		saveButtonLabel,
		shareButtonLabel,
		uploadButtonLabel,
	})
)
