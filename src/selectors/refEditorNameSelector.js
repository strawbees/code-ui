import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const selector = (usePlaceholder) => createSelector(
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

export default selector
