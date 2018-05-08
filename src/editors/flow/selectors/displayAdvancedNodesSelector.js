import { createSelector } from 'reselect'
import flowEditorSelector from 'src/editors/flow/selectors/flowEditorSelector'

export default createSelector(
	[
		flowEditorSelector
	],
	(
		flowEditor
	) => flowEditor.displayAdvancedNodes
)
