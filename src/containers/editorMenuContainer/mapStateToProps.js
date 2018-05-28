import { createSelector } from 'reselect'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorInitializedSelector from 'src/selectors/refEditorInitializedSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import uploadEnabledSelector from 'src/selectors/uploadEnabledSelector'

export default () => createSelector(
	[
		refEditorNameSelector(),
		refEditorSavedSelector(),
		refEditorInitializedSelector(),
		refEditorGeneratedCodeSelector(),
		uploadEnabledSelector(),
		makeStringSelector('ui.editor.program.placeholder_name'),
	],
	(
		name,
		saved,
		initialized,
		generatedCode,
		uploadEnabled,
		placeholderName,
	) => ({
		name,
		saved,
		initialized,
		generatedCode,
		uploadEnabled,
		placeholderName,
	})
)
