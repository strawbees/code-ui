import { createSelector } from 'reselect'
import editorSelector from 'src/selectors/editorSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'

export default () => createSelector(
	[
		editorSelector(),
		refEditorTypeSelector(),
	],
	(
		editor,
		type,
	) => editor[type]
)
