import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

import flowGeneratedCodeSelector from 'src/editors/flow/selectors/generatedCodeSelector'

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
				return flowGeneratedCodeSelector()(state)
			case 'block':
				return generateBlockCode(source)
			case 'text':
				return source
			default:
				return ''
		}
	}
)
