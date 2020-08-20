import { createSelector } from 'reselect'
import flowEditorSelector from 'src/editors/flow/selectors/flowEditorSelector'

const selector = () => createSelector(
	[
		flowEditorSelector(),
	],
	(
		flowEditor
	) => flowEditor.displayAdvancedNodes
)

export default selector
