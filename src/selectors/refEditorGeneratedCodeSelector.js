import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

import generateFlowCode from 'src/editors/flow/utils/generateCode'
import generateBlockCode from 'src/editors/block/utils/generateCode'

export default () => createSelector(
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
				return generateBlockCode(source, state)
			case 'text':
				return source
			default:
				return ''
		}
	}
)
