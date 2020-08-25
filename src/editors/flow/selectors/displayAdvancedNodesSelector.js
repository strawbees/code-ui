import { createSelector } from 'reselect'
import flowEditorSelector from 'src/editors/flow/selectors/flowEditorSelector'

const displayAdvancedNodesSelector = () => createSelector(
	[
		flowEditorSelector(),
	],
	(
		flowEditor
	) => flowEditor.displayAdvancedNodes
)

export default displayAdvancedNodesSelector
