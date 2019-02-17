import { createStructuredSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import storageStatusSelector from 'src/selectors/storageStatusSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'

export default () => createStructuredSelector({
	type               : refEditorTypeSelector(),
	id                 : refEditorIdSelector(),
	source             : refEditorSourceSelector(),
	name               : refEditorNameSelector(),
	safeName           : refEditorNameSelector(true),
	saved              : refEditorSavedSelector(),
	generatedCode      : refEditorGeneratedCodeSelector(),
	storageStatus      : storageStatusSelector(),
	placeholderName    : makeStringSelector('ui.editor.program_placeholder_name'),
	newFlowProgramUrl  : makeInternalUrlStringSelector('flow.url'),
	newBlockProgramUrl : makeInternalUrlStringSelector('block.url'),
	newTextProgramUrl  : makeInternalUrlStringSelector('text.url'),
})
