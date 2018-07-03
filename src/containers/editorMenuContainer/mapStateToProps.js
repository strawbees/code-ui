import { createStructuredSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	type               : refEditorTypeSelector(),
	id                 : refEditorIdSelector(),
	name               : refEditorNameSelector(),
	saved              : refEditorSavedSelector(),
	generatedCode      : refEditorGeneratedCodeSelector(),
	placeholderName    : makeStringSelector('ui.editor.program.placeholder_name'),
	newFlowProgramUrl  : makeStringSelector('flow.url'),
	newBlockProgramUrl : makeStringSelector('block.url'),
	newTextProgramUrl  : makeStringSelector('text.url'),
})
