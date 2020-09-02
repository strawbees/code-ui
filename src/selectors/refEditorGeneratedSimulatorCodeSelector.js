import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

import generateFlowCode from 'src/editors/flow/utils/generateSimulatorCode'
// import generateBlockCode from 'src/editors/block/utils/generateSimulatorCode'

const refEditorGeneratedCodeSelector = () => createSelector(
	[
		stateSelector(),
		refEditorTypeSelector(),
		refEditorSourceSelector(),
	],
	(
		state,
		type,
		source,
	) => {
		switch (type) {
			case 'flow':
				return generateFlowCode(source, state)
			case 'block':
				return ''
				// return generateBlockCode(source, state)
			case 'text':
				return ''
			default:
				return ''
		}
	}
)

export default refEditorGeneratedCodeSelector
