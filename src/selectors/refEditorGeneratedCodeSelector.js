import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

import flowGeneratedCodeSelector from 'src/editors/flow/selectors/generatedCodeSelector'

import generateScratchCode from 'src/editors/scratch/utils/generateCode'

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
			case 'scratch':
				return generateScratchCode(source)
			case 'text':
				return source
			default:
				return ''
		}
	}
)
