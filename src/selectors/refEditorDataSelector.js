import { createSelector } from 'reselect'
import editorSelector from 'src/selectors/editorSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'

const selector = () => createSelector(
	[
		editorSelector(),
		refEditorTypeSelector(),
	],
	(
		editor,
		type,
	) => editor[type]
)

export default selector
