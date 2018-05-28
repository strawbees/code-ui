import { createStructuredSelector } from 'reselect'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorInitializedSelector from 'src/selectors/refEditorInitializedSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import uploadEnabledSelector from 'src/selectors/uploadEnabledSelector'

export default () => createStructuredSelector({
	name            : refEditorNameSelector(),
	saved           : refEditorSavedSelector(),
	initialized     : refEditorInitializedSelector(),
	generatedCode   : refEditorGeneratedCodeSelector(),
	uploadEnabled   : uploadEnabledSelector(),
	placeholderName : makeStringSelector('ui.editor.program.placeholder_name'),
})
