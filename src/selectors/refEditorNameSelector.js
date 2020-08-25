import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const refEditorNameSelector = (usePlaceholder) => createSelector(
	[
		refEditorDataSelector(),
		makeStringSelector('ui.editor.program_placeholder_name'),
	],
	(
		refEditorData,
		placeholderName,
	) => (refEditorData && refEditorData.name) ||
		(usePlaceholder && placeholderName) ||
		''
)

export default refEditorNameSelector
